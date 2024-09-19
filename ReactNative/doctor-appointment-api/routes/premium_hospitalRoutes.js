const express = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const PremiumHospitalModel = require("../models/premium_hospitalModel");

const router = express.Router();

// Get all hospitals
router.get("/hospitals", async (req, res) => {
  try {
    const hospitals = await PremiumHospitalModel.findAll();
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hospitals", error });
  }
});

// Create a new hospital
router.post("/hospitals", async (req, res) => {
  try {
    const hospital = await PremiumHospitalModel.create(req.body);
    res.status(201).json(hospital);
  } catch (error) {
    res.status(500).json({ message: "Error creating hospital", error });
  }
});

// Get a hospital by ID

router.get("/hospitals/id", async (req, res) => {
  try {
    const hospitalId = parseInt(req.query.hospitalId, 10); // Parse the hospital ID as an integer

    // Check if the hospitalId is a valid number
    if (isNaN(hospitalId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(ReasonPhrases.BAD_REQUEST);
    }

    console.log("ID", hospitalId);

    // Find the hospital by ID
    const hospital = await PremiumHospitalModel.findOne({
      where: { id: hospitalId },
    });

    // If no hospital is found, return 404 Not Found
    if (!hospital) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Hospital not found" });
    }

    // Return the hospital if found
    res.status(StatusCodes.OK).json({ premium_hospitals: hospital });
  } catch (error) {
    console.error("Error fetching hospital: ", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching hospital", error: error.message });
  }
});

// Update a hospital
router.put("/hospitals/:id", async (req, res) => {
  try {
    const hospital = await PremiumHospitalModel.findByPk(req.params.id);
    if (hospital) {
      await hospital.update(req.body);
      res.json(hospital);
    } else {
      res.status(404).json({ message: "Hospital not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating hospital", error });
  }
});

// Delete a hospital
router.delete("/hospitals/:id", async (req, res) => {
  try {
    const hospital = await PremiumHospitalModel.findByPk(req.params.id);
    if (hospital) {
      await hospital.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Hospital not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting hospital", error });
  }
});

module.exports = router;
