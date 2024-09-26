const express = require("express");
const {
  getUserDetails,
  getAppointmentsForUser,
  getUserById,
  deleteAppointment,
  getUserByEmail,
  createAppointment,
  getDoctors,
} = require("../controllers/userController");

const router = express.Router();

router.get("/userprofile", getUserDetails); // Get user profile (protected route)

router.get("/user/email", getUserByEmail);
// Get user details by ID
router.get("/user/id", getUserById);

// Get appointments for a doctor
router.get("/appointments/user/id", getAppointmentsForUser);
// Delete an appointment by ID
router.delete("/appointments/appointmentId", deleteAppointment);
// Route to create a new appointment
router.post("/user/create", createAppointment);
router.get("/doctors/all", getDoctors);
module.exports = router;
