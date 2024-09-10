const db = require("./db");

const Appointment = {
  create: (userId, doctorName, appointmentDate) => {
    return db.execute(
      "INSERT INTO appointments (user_id, doctor_name, appointment_date) VALUES (?, ?, ?)",
      [userId, doctorName, appointmentDate]
    );
  },
  findAllByUser: (userId) => {
    return db.execute("SELECT * FROM appointments WHERE user_id = ?", [userId]);
  },
};

module.exports = Appointment;
