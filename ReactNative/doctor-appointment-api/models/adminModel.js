const { DataTypes } = require("sequelize");
const adminSequelize = require("../models/db");

// Define the Admin model
const AdminModel = adminSequelize.define(
  "admin",
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "admin" }
);

module.exports = AdminModel;
