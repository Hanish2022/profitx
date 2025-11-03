// controllers/profileController.js
const User = require("../models/User"); // Import the User model

// Get user profile by ID
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId); // Use req.params.userId to fetch user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user); // Send back the user profile
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user profile by ID
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true }); // Use req.params.userId for update
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user); // Return updated user profile
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
