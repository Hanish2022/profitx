const mongoose = require("mongoose");
const locationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    coordinates: {
      type: { type: String, default: "Point" },
      coordinates: [Number],
    },
  });
  
  locationSchema.index({ coordinates: "2dsphere" });
  
  module.exports = mongoose.model("Location", locationSchema);