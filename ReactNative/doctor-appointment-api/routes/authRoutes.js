const express = require("express");
const {
  signup,
  login,
  adminsignup,
  adminlogin,
  doctorsignup,
  doctorlogin,
} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
// Admin routes
router.post("/admin/signup", adminsignup);
router.post("/admin/login", adminlogin);

// Doctor routes
router.post("/doctor/signup", doctorsignup);
router.post("/doctor/login", doctorlogin);

module.exports = router;
