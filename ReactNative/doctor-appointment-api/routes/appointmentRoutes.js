const express = require("express");
const {
  getAppointments,
  postAppointments,
} = require("../controllers/appointmentController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Protect the routes with auth middleware

router.get("/dashboard", authMiddleware, getAppointments);
router.post("/post", postAppointments);

module.exports = router;
