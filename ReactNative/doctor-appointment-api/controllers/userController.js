const AppointmentModel = require("../models/appointmentModel");
const DoctorModel = require("../models/doctorModel");
const UserModel = require("../models/userModel");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const moment = require("moment");
// Controller function

exports.getUserByEmail = async (req, res) => {
  try {
    const email = req.query.email; // Get the email from the query parameters

    // Find the doctor by email
    const user = await UserModel.findOne({
      where: { email: email },
    });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    console.error("Error fetching user: ", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching user", error: error.message });
  }
};
exports.getUserDetails = async (req, res) => {
  const { email } = req.query; // Assuming email is passed as a query parameter

  // Check if the email is provided
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Fetch the user based on the email
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch appointments based on the user's ID
    const appointments = await AppointmentModel.findAll({
      where: {
        user_id: user.id, // Use user ID for fetching appointments
      },
      include: [
        {
          model: UserModel,
          as: "user", // Use the alias here
          attributes: ["id", "name", "email"], // Fetch specific user attributes
        },
        {
          model: DoctorModel, // Assuming DoctorModel represents your doctors table
          as: "doctor", // Ensure you use the correct alias for DoctorModel
          attributes: ["name"], // Include the doctor's name in the results
        },
      ],
    });

    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this user" });
    }

    res.status(200).json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// Fetch user details by ID
exports.getUserById = async (req, res) => {
  try {
    const user_id = parseInt(req.query.user_id, 10); // Changed to use req.params for cleaner URL structure

    // Check if the user_id is a valid number
    if (isNaN(user_id)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(ReasonPhrases.BAD_REQUEST);
    }

    console.log("USER ID", user_id);

    // Find the doctor by ID
    const user = await UserModel.findOne({
      where: { id: user_id },
    });

    // If no doctor is found, return 404 Not Found
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // Return the doctor if found
    res.status(StatusCodes.OK).json({ user }); // Changed key to be singular
  } catch (error) {
    console.error("Error fetching doctor: ", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching doctor", error: error.message });
  }
};
// Fetch appointments for the user
exports.getAppointmentsForUser = async (req, res) => {
  try {
    const user_id = parseInt(req.query.user_id, 10); // Ensure doctor_id is an integer

    // Check if doctor_id is a valid number
    if (isNaN(user_id)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid user ID" });
    }

    console.log("User_id:", user_id); // Log the doctor ID for debugging

    const appointments = await AppointmentModel.findAll({
      where: { user_id },
    });

    if (!appointments.length) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No appointments found" });
    }

    res.status(StatusCodes.OK).json(appointments);
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
// Create a new appointment
exports.createAppointment = async (req, res) => {
  const { doctor_id, user_id, doctor_name, patient_name, time, status } =
    req.body;

  // Validate input data
  if (
    !doctor_id ||
    isNaN(doctor_id) ||
    !user_id ||
    isNaN(user_id) ||
    !doctor_name ||
    !patient_name ||
    !time
  ) {
    return res
      .status(400)
      .json({ message: "Doctor ID, Patient ID and Time are required" });
  }

  // Convert doctor_id to an integer
  const doctorIdInt = parseInt(doctor_id, 10);
  if (isNaN(doctorIdInt)) {
    return res.status(400).json({ message: "Valid Doctor ID is required" });
  }
  // Convert doctor_id to an integer
  const patientIdInt = parseInt(user_id, 10);
  if (isNaN(patientIdInt)) {
    return res.status(400).json({ message: "Valid Doctor ID is required" });
  }
  try {
    // Check if doctor and patient exist
    const doctor = await DoctorModel.findOne({ _id: doctorIdInt }); // Use the parsed integer ID
    const patient = await UserModel.findOne({ _id: patientIdInt });
    if (!doctor || !patient) {
      return res.status(404).json({ message: "Doctor or patient not found" });
    }

    // Create a new appointment
    const newAppointment = new AppointmentModel({
      doctor_id: doctorIdInt, // Store as an integer
      user_id: patientIdInt,
      doctor_name,
      patient_name,
      time,
      status: status || "scheduled", // Default status to 'scheduled'
    });

    // Save the appointment to the database
    await newAppointment.save();

    // Respond with the created appointment's data
    res.status(201).json({
      id: newAppointment._id,
      doctor_id: doctorIdInt,
      doctor_name,
      patient_name,
      user_id: patientIdInt,
      time,
      status: newAppointment.status,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Route to get doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.findAll();
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error); // Log the actual error to the console
    res
      .status(500)
      .json({ message: "Error fetching doctors", error: error.message }); // Include error message in response
  }
};
