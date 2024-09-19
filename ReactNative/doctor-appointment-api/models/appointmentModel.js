const { DataTypes } = require("sequelize");
const userSequelize = require("../models/db");
const doctorModel = require("../models/doctorModel");

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
    patient_name: {
      type: DataTypes.STRING,
      allowNull: false,
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
  foreignKey: "doctorId", // Doctor who the appointment is with
  as: "doctors",
});

module.exports = AppointmentModel;
