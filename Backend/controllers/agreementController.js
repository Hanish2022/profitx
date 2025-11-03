const Agreement = require("../models/Agreement");

exports.createAgreement = async (req, res) => {
  try {
    const agreement = await Agreement.create(req.body);
    res.status(201).json(agreement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};