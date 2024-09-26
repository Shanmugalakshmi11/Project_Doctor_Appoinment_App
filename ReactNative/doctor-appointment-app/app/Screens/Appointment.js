import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import { getToken } from "../services/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const Appointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctorName, setDoctorName] = useState("");
  const [patientName, setPatientName] = useState("");
  const [doctorID, setDoctorID] = useState("");
  const [patientID, setPatientID] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/doctors/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(
            `Error: ${response.status} - ${errorResponse.message}`
          );
        }

        const doctorsData = await response.json();
        setDoctors(doctorsData);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchAppointments = async () => {
      try {
        const email = await AsyncStorage.getItem("email");
        if (!email) throw new Error("No email found");

        const token = await getToken();
        if (!token) throw new Error("No token provided");

        const userResponse = await fetch(
          `http://localhost:3000/api/userprofile?email=${email}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!userResponse.ok) {
          const errorResponse = await userResponse.json();
          throw new Error(
            `Error: ${userResponse.status} - ${errorResponse.message}`
          );
        }

        const userData = await userResponse.json();
        const user_id = userData?.[0]?.user?.id
          ? parseInt(userData[0].user.id, 10)
          : null;

        if (isNaN(user_id)) {
          throw new Error("User ID is invalid");
        }

        const appointmentsResponse = await fetch(
          `http://localhost:3000/api/appointments/user/id?user_id=${user_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!appointmentsResponse.ok) {
          const errorResponse = await appointmentsResponse.json();
          throw new Error(
            `Error: ${appointmentsResponse.status} - ${errorResponse.message}`
          );
        }

        const appointments = await appointmentsResponse.json();
        setAppointments(appointments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
    fetchAppointments();
  }, []); // Run once on mount

  const confirmDeleteAppointment = (id) => {
    Alert.alert(
      "Delete Appointment",
      "Are you sure you want to delete this appointment?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => deleteAppointment(id), // Make sure this correctly references the delete function
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const createAppointment = async () => {
    try {
      const token = await getToken();
      if (!token) throw new Error("No token provided");

      const response = await fetch(`http://localhost:3000/api/user/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctor_name: doctorName,
          patient_name: patientName,
          user_id: patientID,
          doctor_id: doctorID,
          time: appointmentTime,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Error: ${response.status} - ${errorResponse.message}`);
      }

      const newAppointment = await response.json();
      setAppointments((prevAppointments) => [
        ...prevAppointments,
        newAppointment,
      ]);

      // Clear input fields
      setDoctorName("");
      setPatientName("");
      setAppointmentTime("");
      setPatientID("");
      setDoctorID("");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.errorText}>Oops! {error}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* First Row: Appointments */}
        <View style={styles.leftColumn}>
          <Text style={styles.title}>Your Appointments</Text>
          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <AppointmentCard
                appointment={item}
                deleteAppointment={confirmDeleteAppointment}
              />
            )}
          />
        </View>

        {/* Second Row: Doctors List */}
        <View style={styles.rightColumn}>
          <Text style={styles.title}>List of Doctors</Text>
          <FlatList
            data={doctors}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.doctorCard}>
                <Text style={styles.doctorName}>{item.name}</Text>
                <Text style={styles.doctorID}>ID: {item.id}</Text>
              </View>
            )}
          />
        </View>
      </View>

      {/* Input Fields to Add New Appointment */}
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Create New Appointment</Text>
        <TextInput
          style={styles.input}
          placeholder="Doctor Name"
          value={doctorName}
          onChangeText={setDoctorName}
        />
        <TextInput
          style={styles.input}
          placeholder="Patient Name"
          value={patientName}
          onChangeText={setPatientName}
        />
        <TextInput
          style={styles.input}
          placeholder="Patient ID"
          value={patientID}
          onChangeText={setPatientID}
        />
        <TextInput
          style={styles.input}
          placeholder="Doctor ID"
          value={doctorID}
          onChangeText={setDoctorID}
        />
        <TextInput
          style={styles.input}
          placeholder="Appointment Time (e.g. 2024-09-30T10:00:00Z)"
          value={appointmentTime}
          onChangeText={setAppointmentTime}
        />
        <TouchableOpacity style={styles.addButton} onPress={createAppointment}>
          <Text style={styles.buttonText}>Get Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AppointmentCard = ({ appointment }) => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  const formattedDate = moment(appointment.time).format("YYYY-MM-DD");
  const formattedTime = moment(appointment.time)
    .utcOffset(0)
    .format("HH:mm:ss");
  const deleteAppointment = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/appointments/appointmentId?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Error: ${response.status} - ${errorResponse.message}`);
      }

      setAppointments((prev) =>
        prev.filter((appointment) => appointment.id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <View style={styles.appointmentCard}>
      <Text style={styles.detailText}>
        Doctor Id: {appointment.doctor_id || "N/A"}
      </Text>
      <Text style={styles.detailText}>
        Doctor: {appointment.doctor_name || "N/A"}
      </Text>
      <Text style={styles.detailText}>Date: {formattedDate}</Text>
      <Text style={styles.detailText}>Time: {formattedTime}</Text>
      <Text style={styles.detailText}>
        Patient: {appointment.patient_name || "N/A"}
      </Text>
      <Text style={styles.status(appointment.status)}>
        status: {appointment.status || "N/A"}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteAppointment(appointment.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftColumn: {
    flex: 1,
    marginRight: 10, // Space between the two columns
  },
  rightColumn: {
    flex: 1,
    marginLeft: 10,
  },
  inputContainer: {
    marginVertical: 20,
    width: 500,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "red",
    fontWeight: "bold",
  },
  doctorListContainer: {
    marginVertical: 20,
    width: 500,
  },
  doctorCard: {
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 5,
    width: 500,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  status: (status) => ({
    fontSize: 20,
    color:
      status === "confirmed"
        ? "green"
        : status === "scheduled"
        ? "blue"
        : status === "completed"
        ? "violet"
        : "red",
  }),
  doctorID: {
    fontSize: 16,
  },
  appointmentCard: {
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 5,
    width: 500,
  },
  detailText: {
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default Appointment;
