const { DataTypes } = require("sequelize");
const userSequelize = require("../models/db");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel"); // Import UserModel

// Define the Appointment model
const AppointmentModel = userSequelize.define(
  "appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: doctorModel,
        key: "id",
      },
    },
    doctor_name: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: doctorModel, // Reference UserModel
        key: "name",
      },
    },
    user_id: {
      // Add a foreign key for the user
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: userModel, // Reference UserModel
        key: "id",
      },
    },
    patient_name: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: userModel, // Reference UserModel
        key: "name",
      },
    },
    time: {
      type: DataTypes.TIME, // Store appointment time
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "completed", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  { tableName: "appointments" }
);

// Relationships
AppointmentModel.belongsTo(doctorModel, {
  foreignKey: "doctor_id", // Doctor who the appointment is with
  as: "doctor", // Singular form for association
});

AppointmentModel.belongsTo(userModel, {
  // Associate with UserModel
  foreignKey: "user_id", // User who booked the appointment
  as: "user", // Singular form for association
});

module.exports = AppointmentModel;
