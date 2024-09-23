const express = require("express");
const {
  getDoctorById,
  getAppointmentsForDoctor,
  deleteAppointment,
} = require("../controllers/doctorController");
const router = express.Router();

// Get doctor details by ID
router.get("/doctors/id", getDoctorById);

// Get appointments for a doctor
router.get("/appointments/doctor/id", getAppointmentsForDoctor);

// Delete an appointment by ID
router.delete("/appointments/appointmentId", deleteAppointment);

module.exports = router;
