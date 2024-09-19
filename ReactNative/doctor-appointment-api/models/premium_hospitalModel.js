const { DataTypes } = require("sequelize");
const userSequelize = require("../models/db");

// Define the PremiumHospital model
const PremiumHospitalModel = userSequelize.define(
  "premium_hospital",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
      validate: {
        min: 0.0,
        max: 5.0,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { tableName: "premium_hospitals" }
);

module.exports = PremiumHospitalModel;
