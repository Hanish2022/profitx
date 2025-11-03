const ServiceRequest = require("../models/ServiceRequest");

// ✅ Create a new service request
exports.createRequest = async (req, res) => {
  try {
    const { requester, provider, skillRequired, skillOffered, chat } = req.body;

    // Optional: Validate required fields
    if (!requester || !provider || !skillRequired || !skillOffered) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const request = new ServiceRequest({
      requester,
      provider,
      skillRequired,
      skillOffered,
      chat: chat || []
    });

    await request.save();

    res.status(201).json({
      message: "Service request created successfully",
      data: request
    });
  } catch (err) {
    console.error("Error creating service request:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all service requests by user ID
exports.getRequestsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const requests = await ServiceRequest.find({
      $or: [{ requester: userId }, { provider: userId }]
    });

    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "No service requests found for this user" });
    }

    res.status(200).json(requests);
  } catch (err) {
    console.error("Error fetching service requests:", err);
    res.status(500).json({ error: err.message });
  }
};
