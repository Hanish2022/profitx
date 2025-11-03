const Credit = require("../models/Credit");

exports.getCredits = async (req, res) => {
  try {
    const credits = await Credit.find({ user: req.params.userId });
    res.status(200).json(credits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addCredit = async (req, res) => {
  try {
    const credit = await Credit.create(req.body);
    res.status(201).json(credit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
