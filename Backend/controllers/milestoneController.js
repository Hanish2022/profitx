const Milestone = require("../models/Milestone");

exports.addMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.create(req.body);
    res.status(201).json(milestone);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(milestone);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
