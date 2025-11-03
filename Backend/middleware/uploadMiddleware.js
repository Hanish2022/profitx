const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const stream = require("stream");

// Configure Cloudinary (should be in your app initialization)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Store in memory before uploading to Cloudinary
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and PDF files are allowed (max 5MB)"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

module.exports = (req, res, next) => {
  upload.single("file")(req, res, async (err) => {
    try {
      // Handle Multer errors first
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: "File size exceeds 5MB limit" });
        }
        return res.status(400).json({ error: err.message });
      }

      // Check if file exists
      if (!req.file) {
        return res.status(400).json({ error: "No file provided" });
      }

      // Create a buffer stream for Cloudinary
      const bufferStream = new stream.PassThrough();
      bufferStream.end(req.file.buffer);

      // Upload options
      const uploadOptions = {
        resource_type: "auto",
        public_id: `${Date.now()}-${req.file.originalname.split('.')[0]}`,
        folder: "uploads" // Optional folder in Cloudinary
      };

      // Upload to Cloudinary using promise-based approach
      const cloudinaryResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(new Error("Failed to upload file to Cloudinary"));
            } else {
              resolve(result);
            }
          }
        );

        bufferStream.pipe(uploadStream);
      });

      // Attach Cloudinary result to request object for later use
      req.cloudinaryResult = cloudinaryResult;
      
      // Continue to next middleware or send response
      if (next) {
        next();
      } else {
        res.status(200).json({
          message: "File uploaded successfully",
          data: {
            url: cloudinaryResult.secure_url,
            public_id: cloudinaryResult.public_id,
            format: cloudinaryResult.format,
            size: cloudinaryResult.bytes
          }
        });
      }

    } catch (error) {
      console.error("Upload processing error:", error);
      res.status(500).json({ 
        error: error.message || "Error processing file upload",
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  });
};