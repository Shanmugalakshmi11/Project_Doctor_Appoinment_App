const DoctorModel = require("../models/doctorModel"); // Assuming you have a Doctor model
const AppointmentModel = require("../models/appointmentModel"); // Assuming you have an Appointment model
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// Fetch doctor details by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor_id = parseInt(req.query.doctor_id, 10); // Changed to use req.params for cleaner URL structure

    // Check if the doctor_id is a valid number
    if (isNaN(doctor_id)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(ReasonPhrases.BAD_REQUEST);
    }

    console.log("DOCTOR ID", doctor_id);

    // Find the doctor by ID
    const doctor = await DoctorModel.findOne({
      where: { id: doctor_id },
    });

    // If no doctor is found, return 404 Not Found
    if (!doctor) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Doctor not found" });
    }

    // Return the doctor if found
    res.status(StatusCodes.OK).json({ doctor }); // Changed key to be singular
  } catch (error) {
    console.error("Error fetching doctor: ", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching doctor", error: error.message });
  }
};

// Fetch appointments for the doctor
exports.getAppointmentsForDoctor = async (req, res) => {
  try {
    const doctor_id = parseInt(req.query.doctor_id, 10); // Ensure doctorId is an integer

    const appointments = await AppointmentModel.findAll({
      where: { doctor_id },
    }); // Adjusted to use findAll

    if (!appointments.length) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No appointments found" });
    }

    res.status(StatusCodes.OK).json(appointments); // Added status code for clarity
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

// Delete an appointment by ID
exports.deleteAppointment = async (req, res) => {
  try {
    const id = parseInt(req.query.id, 10);

    const appointments = await AppointmentModel.findByPk(id); // Use findByPk for clarity
    if (!appointments) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Appointment not found" });
    }

    await AppointmentModel.destroy({ where: { id: id } }); // Use destroy with where clause

    res
      .status(StatusCodes.OK)
      .json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};
