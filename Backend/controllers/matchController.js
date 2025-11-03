const User = require('../models/User'); // Ensure this is the correct path for your User model

exports.matchUsersBySkill = async (req, res) => {
  const { skill } = req.query; // Retrieving the skill from query parameters
  
  // Check if the skill parameter exists
  if (!skill) {
    return res.status(400).json({ error: "Skill parameter is required" });
  }

  try {
    // Aggregate to match users who have the specific skill and are verified
    const users = await User.aggregate([
      { $match: { skills: skill, verified: true } }, // Match users with the skill
      { $project: { name: 1, email: 1, skills: 1 } } // Only return name, email, and skills
    ]);
    
    // Check if any users are found
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found with the requested skill" });
    }
    
    // Return the matched users
    res.status(200).json(users);
  } catch (err) {
    // Catch and return error if any
    console.error("Error fetching users:", err); // For debugging purposes
    res.status(500).json({ error: "Server error occurred while fetching users. Please try again later." });
  }
};
