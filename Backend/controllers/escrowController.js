// controllers/escrowController.js
const Escrow = require("../models/Escrow");

exports.createEscrow = async (req, res) => {
  try {
    const { serviceRequest, status } = req.body;

    const escrow = new Escrow({ serviceRequest, status: status || "holding" });
    const savedEscrow = await escrow.save();

    res.status(201).json({ success: true, data: savedEscrow });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateEscrowStatus = async (req, res) => {
  try {
    const escrow = await Escrow.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: escrow });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
