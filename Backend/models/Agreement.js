const mongoose = require("mongoose");
const agreementSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    serviceRequest: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceRequest" },
    content: String,
    signedBy: [String],
    pdfUrl: String,
  }, { timestamps: true });
  
  module.exports = mongoose.model("Agreement", agreementSchema);
  