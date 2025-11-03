const User = require("../models/User");
const generateOTP = require("../utils/otpGenerator");
const sendEmail = require("../utils/emailSender");
const jwt = require("jsonwebtoken");

// Register new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, skills, portfolio, location } = req.body;

    if (!name || !email || !password || !location || !location.coordinates || location.coordinates.length !== 2) {
      return res.status(400).json({ success: false, message: "All fields are required and location must be [longitude, latitude]." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists with this email" });
    }

    const otp = generateOTP();

    const user = new User({ name, email, password, otp, skills, portfolio, location });
    await user.save();

    await sendEmail(email, "Your OTP Code", `Your OTP is: ${otp}`);

    return res.status(201).json({ success: true, message: "User created successfully. OTP sent to email.", userId: user._id });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "An error occurred while creating the user", error: error.message });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && user.otp === otp) {
      user.verified = true;
      user.otp = null;
      await user.save();
      res.status(200).json({ success: true, message: "User verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });
    if (!user.verified) return res.status(400).json({ success: false, message: "Please verify your account first" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
