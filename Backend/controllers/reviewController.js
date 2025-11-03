const Review = require("../models/Review");

exports.addReview = async (req, res) => {
  try {
    const { reviewer, reviewee, rating, comment } = req.body;

    // Optional: Validate required fields manually
    if (!reviewer || !reviewee || !rating) {
      return res.status(400).json({ error: "Reviewer, reviewee, and rating are required." });
    }

    const review = await Review.create({ reviewer, reviewee, rating, comment });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
