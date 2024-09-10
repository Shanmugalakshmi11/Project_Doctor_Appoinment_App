const express = require("express");
const {
  bookAppointment,
  getAppointments,
} = require("../controllers/appointmentController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Protect the routes with auth middleware
router.post("/book", authMiddleware, bookAppointment);
router.get("/user", authMiddleware, getAppointments);

module.exports = router;
