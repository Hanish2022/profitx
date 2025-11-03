const mongoose = require("mongoose");
const creditSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: Number,
    type: { type: String, enum: ["earned", "spent"] },
    reason: String,
  }, { timestamps: true });
  
  module.exports = mongoose.model("Credit", creditSchema);
  