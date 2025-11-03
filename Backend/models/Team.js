const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
    name: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    tasks: [String],
  }, { timestamps: true });
  
  module.exports = mongoose.model("Team", teamSchema);