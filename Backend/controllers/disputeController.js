const Dispute = require("../models/Dispute");

exports.reportDispute = async (req, res) => {
  try {
    const dispute = await Dispute.create(req.body);
    res.status(201).json(dispute);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};