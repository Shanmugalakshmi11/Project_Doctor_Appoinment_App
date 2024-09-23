const AppointmentModel = require("../models/appointmentModel");

exports.getAppointments = async (req, res) => {
  try {
    // Fetch admin-specific data from the database
    const appointments = await AppointmentModel.findAll(); // Adjust query as needed

    res.status(200).json(appointments);
  } catch (err) {
    console.error("Error fetching admin dashboard data:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const { isValid } = require("date-fns"); // Example for date validation

exports.postAppointments = async (req, res) => {
  const { doctor_id, patient_name, time, status } = req.body;

  // Validate request data
  if (!doctor_id || !patient_name || !time || !status) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Validate date and time format (Example)
  if (!isValid(new Date(time))) {
    return res.status(400).json({ message: "Invalid date or time format" });
  }

  try {
    // Create a new appointment record
    const newAppointment = await AppointmentModel.create({
      doctor_id: doctor_id,
      patient_name: patient_name,
      time: time,
      status: status,
    });

    res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment,
    });
  } catch (err) {
    console.error("Error creating appointment:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
