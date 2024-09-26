const AdminModel = require("../models/adminModel"); // Replace with your actual path
const DoctorModel = require("../models/doctorModel");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/userModel");

// Get Admin Dashboard Data
exports.getAdminDashboardData = async (req, res) => {
  try {
    // Fetch admin-specific data from the database
    const admin = await AdminModel.findAll(); // Adjust query as needed

    res.status(200).json(admin);
  } catch (err) {
    console.error("Error fetching admin dashboard data:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// Get all doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.findAll();

    res.status(200).json(doctors);
  } catch (err) {
    console.error("Error fetching admin dashboard data:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new doctor
exports.addDoctor = async (req, res) => {
  const { email, name, password, specialty, experience } = req.body;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid email format" });
  }

  try {
    const existingDoctor = await DoctorModel.findOne({ where: { email } });
    if (existingDoctor) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Doctor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = await DoctorModel.create({
      email,
      name,
      password: hashedPassword,
      specialty,
      experience,
    });

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Doctor added successfully", doctor: newDoctor });
  } catch (err) {
    console.error("Error adding doctor:", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const id = parseInt(req.query.id, 10);

    const doctors = await DoctorModel.findByPk(id); // Use findByPk for clarity
    if (!doctors) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Doctor not found" });
    }

    await DoctorModel.destroy({ where: { id: id } }); // Use destroy with where clause

    res.status(StatusCodes.OK).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};
// Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.user.id, {
      attributes: ["id", "name", "email"], // Select only necessary fields
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await UserModel.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    await user.save(); // Save the updated user

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
