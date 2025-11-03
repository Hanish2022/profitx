const mongoose = require("mongoose");
const escrowSchema = new mongoose.Schema({
    serviceRequest: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceRequest" },
    status: { type: String, enum: ["holding", "released", "disputed"], default: "holding" },
  }, { timestamps: true });
  
  module.exports = mongoose.model("Escrow", escrowSchema);
  