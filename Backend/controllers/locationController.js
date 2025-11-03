const Location = require("../models/Location");

exports.updateLocation = async (req, res) => {
  try {
    const { userId, coordinates } = req.body;
    const location = await Location.findOneAndUpdate(
      { user: userId },
      { coordinates },
      { new: true, upsert: true }
    );
    res.status(200).json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findNearby = async (req, res) => {
  try {
    const { lat, lng, distance } = req.query;
    const nearbyUsers = await Location.find({
      coordinates: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(distance),
        },
      },
    });
    res.status(200).json(nearbyUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};