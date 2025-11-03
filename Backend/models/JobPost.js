const mongoose = require("mongoose");
const jobPostSchema = new mongoose.Schema({
    title: String,
    description: String,
    requiredSkills: [String],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  }, { timestamps: true });
  
  module.exports = mongoose.model("JobPost", jobPostSchema);
  