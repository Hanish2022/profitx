const mongoose = require("mongoose");
const disputeSchema = new mongoose.Schema({
    raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    serviceRequest: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceRequest" },
    reason: String,
    status: { type: String, enum: ["under review", "resolved"], default: "under review" },
  }, { timestamps: true });
  
  module.exports = mongoose.model("Dispute", disputeSchema);
  