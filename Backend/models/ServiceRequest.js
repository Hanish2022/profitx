const mongoose = require("mongoose"); // Ensure that mongoose is imported

const serviceRequestSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  skillRequired: String,
  skillOffered: String,
  status: { 
    type: String, 
    enum: ["pending", "negotiating", "accepted", "completed"], 
    default: "pending" 
  },
  chat: [{ sender: String, message: String, timestamp: Date }],
}, { timestamps: true });

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
