const Appointment = require("../models/appointmentModel");

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err.message, err.stack);
    res.status(500).json({
      message: "Server error",
      error: err.message, // Provide error message for more detail
    });
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
    const newAppointment = await Appointment.create({
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
