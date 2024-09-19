// Appointments.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments for a specific doctor (e.g., doctor with id 1)
    axios
      .get("http://localhost:3000/appointments/1")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the appointments!", error);
      });
  }, []);

  return (
    <div>
      <h1>Appointments</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.patient} -{" "}
            {new Date(appointment.appointment_time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
