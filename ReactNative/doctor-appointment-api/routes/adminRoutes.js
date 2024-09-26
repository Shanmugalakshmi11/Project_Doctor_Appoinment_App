const express = require("express");
const router = express.Router();
const {
  getAdminDashboardData,
  getDoctors,
  addDoctor,
  deleteDoctor,
  getProfile,
  updateProfile,
} = require("../controllers/adminController");

const authMiddleware = require("../middlewares/authMiddleware");

// Protected route
router.get("/dashboard", authMiddleware, getAdminDashboardData);
router.get("/doctors", authMiddleware, getDoctors);
router.post("/doctors", addDoctor);
router.delete("/doctors/doctorId", deleteDoctor);
// Get user profile
router.get("/userprofile", authMiddleware, getProfile);

// Update user profile
router.put("/put/userprofile", authMiddleware, updateProfile);
module.exports = router;
