const mongoose = require("mongoose");
const milestoneSchema = new mongoose.Schema({
    serviceRequest: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceRequest" },
    title: String,
    completed: { type: Boolean, default: false },
  }, { timestamps: true });
  
  module.exports = mongoose.model("Milestone", milestoneSchema);
  