require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const loggerMiddleware = require("./middlewares/loggerMiddleware");
const rateLimit = require("./middlewares/rateLimit");
const adminRoutes = require("./routes/adminRoutes");
const PremiumHospitalRoutes = require("./routes/premium_hospitalRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
// Middleware
app.use(bodyParser.json());
app.use(loggerMiddleware); // Apply logger middleware globally

// Rate limiting on specific routes
app.use("/api/auth", rateLimit);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", PremiumHospitalRoutes);
app.use("/api", doctorRoutes);
app.use("/api", userRoutes);

// Global error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
