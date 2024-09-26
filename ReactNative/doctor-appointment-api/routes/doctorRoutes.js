const express = require("express");
const {
  getDoctorById,
  getAppointmentsForDoctor,
  deleteAppointment,
  getDoctorByEmail,
  getDoctors,
} = require("../controllers/doctorController");

const router = express.Router();

router.get("/doctors/email", getDoctorByEmail);
// Get doctor details by ID
router.get("/doctors/id", getDoctorById);

router.get("/doctors/all", getDoctors);
// Get appointments for a doctor
router.get("/appointments/doctor/id", getAppointmentsForDoctor);

// Delete an appointment by ID
router.delete("/appointments/appointmentId", deleteAppointment);

module.exports = router;
