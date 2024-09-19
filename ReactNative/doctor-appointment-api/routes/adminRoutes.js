const express = require("express");
const router = express.Router();
const { getAdminDashboardData } = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

// Protected route
router.get("/dashboard", authMiddleware, getAdminDashboardData);

module.exports = router;
