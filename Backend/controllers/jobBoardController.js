const JobPost = require("../models/JobPost");

exports.createJobPost = async (req, res) => {
  try {
    const job = await JobPost.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllJobPosts = async (req, res) => {
  try {
    const jobs = await JobPost.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Add this to get job post by ID
exports.getJobPostById = async (req, res) => {
  try {
    const job = await JobPost.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job post not found" });
    }
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
