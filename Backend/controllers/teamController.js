const Team = require("../models/Team");

exports.createTeam = async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
