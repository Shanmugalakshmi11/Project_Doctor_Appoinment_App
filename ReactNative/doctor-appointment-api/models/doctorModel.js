const { DataTypes } = require("sequelize");
const doctorSequelize = require("../models/db");

// Define the Doctor model
const DoctorModel = doctorSequelize.define(
  "doctor",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "doctors" }
);

module.exports = DoctorModel;
