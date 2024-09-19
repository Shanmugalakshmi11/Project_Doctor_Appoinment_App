// Patients.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch patients for a specific doctor (e.g., doctor with id 1)
    axios
      .get("http://localhost:3001/patients/1")
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the patients!", error);
      });
  }, []);

  return (
    <div>
      <h1>Patients</h1>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            {patient.name} - History: {patient.history}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Patients;
