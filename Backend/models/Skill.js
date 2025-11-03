const mongoose = require("mongoose");
const skillSchema = new mongoose.Schema({
    name: String,
    category: String,
  });
  
  module.exports = mongoose.model("Skill", skillSchema);
  