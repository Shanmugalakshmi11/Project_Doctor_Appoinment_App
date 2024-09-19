const Admin = require("../models/adminModel"); // Replace with your actual path

// Get Admin Dashboard Data
exports.getAdminDashboardData = async (req, res) => {
  try {
    // Fetch admin-specific data from the database
    const admin = await Admin.findAll(); // Adjust query as needed

    res.status(200).json(admin);
  } catch (err) {
    console.error("Error fetching admin dashboard data:", err);
    res.status(500).json({ message: "Server error" });
  }
};
