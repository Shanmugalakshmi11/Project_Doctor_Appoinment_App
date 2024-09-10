const Appointment = require("../models/appointmentModel");

exports.bookAppointment = async (req, res) => {
  const { doctorName, appointmentDate } = req.body;
  const userId = req.user.id;

  try {
    await Appointment.create(userId, doctorName, appointmentDate);
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAppointments = async (req, res) => {
  const userId = req.user.id;

  try {
    const [appointments] = await Appointment.findAllByUser(userId);
    res.status(200).json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
