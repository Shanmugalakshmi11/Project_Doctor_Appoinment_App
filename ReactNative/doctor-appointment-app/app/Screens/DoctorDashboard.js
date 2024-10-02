import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import { getToken } from "../services/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment"; // Import moment for date and time formatting
import axios from "axios";

const DoctorDashboard = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmailAndAppointments = async () => {
      try {
        const email = await AsyncStorage.getItem("email");
        if (!email) throw new Error("No email found");

        const token = await getToken();
        if (!token) throw new Error("No token provided");

        const doctorResponse = await fetch(
          `http://localhost:3000/api/doctors/email?email=${email}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!doctorResponse.ok) {
          const errorResponse = await doctorResponse.json();
          throw new Error(
            `Error: ${doctorResponse.status} - ${errorResponse.message}`
          );
        }

        const doctorData = await doctorResponse.json();
        const doctorId = parseInt(doctorData.doctor.id, 10); // Ensure it's a number
        if (isNaN(doctorId)) {
          throw new Error("Doctor ID is invalid");
        }

        console.log("Doctor ID:", doctorId); // Log doctor ID

        const appointmentsResponse = await fetch(
          `http://localhost:3000/api/appointments/doctor/id?doctor_id=${doctorId}`,
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

    fetchEmailAndAppointments();
  }, []); // Run once on mount
  const confirmAppointment = async (appointmentId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/appointments/confirm",
        {
          appointmentId: appointmentId,
        }
      );

      if (response.status === 200) {
        // Update the status in the state for the confirmed appointment
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === appointmentId
              ? { ...appointment, status: "confirmed" }
              : appointment
          )
        );
        Alert.alert("Success", "Appointment confirmed successfully!");
      } else {
        Alert.alert("Error", "Failed to confirm the appointment.");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Something went wrong while confirming the appointment."
      );
      console.error(error);
    }
  };

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

      // Remove the deleted appointment from the state
      setAppointments((prev) =>
        prev.filter((appointment) => appointment.id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.errorText}>Oops! {error}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Doctor Dashboard</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text
            style={styles.profileIcon}
            accessible={true}
            accessibilityLabel="Profile"
          >
            👤
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>

        {appointments.length === 0 ? (
          <Text style={styles.noAppointments}>No upcoming appointments</Text>
        ) : (
          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              // Split the date and time using moment

              const date = moment(item.time).format("YYYY-MM-DD"); // Date format: YYYY-MM-DD
              const time = moment(item.time)
                .utcOffset(0) //
                .format("HH:mm:ss"); // Time format: 24-hour format (HH:mm)
              return (
                <View style={styles.appointment}>
                  <Text style={styles.patientName}>
                    <Text style={styles.title1}>Patient Name: </Text>
                    {item.patient_name}
                  </Text>
                  <Text style={styles.time}>
                    <Text style={styles.title1}>Date: </Text>
                    {date}
                  </Text>
                  <Text style={styles.time}>
                    <Text style={styles.title1}>Time: </Text>
                    {time}
                  </Text>
                  <Text style={styles.status(item.status)}>
                    <Text style={styles.title1}>Status: </Text>
                    {item.status}
                  </Text>
                  <View style={styles.buttonContainer}>
                    <Button
                      title="Confirm"
                      onPress={() => confirmAppointment(item.id)}
                      color="green"
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <Button
                      title="Delete"
                      onPress={() => deleteAppointment(item.id)}
                      color="#dc3545"
                    />
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileIcon: {
    fontSize: 24,
  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  appointment: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    width: 750,
  },
  patientName: {
    fontSize: 26,
  },
  time: {
    fontSize: 24,
    color: "#555",
  },
  status: (status) => ({
    fontSize: 20,
    color:
      status === "confirmed"
        ? "green"
        : status === "Scheduled"
        ? "blue"
        : status === "completed"
        ? "violet"
        : "red",
  }),
  buttonContainer: {
    marginTop: 10,
    alignContent: "center",
    width: 200,
  },
  noAppointments: {
    fontSize: 16,
    color: "#999",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});

export default DoctorDashboard;
