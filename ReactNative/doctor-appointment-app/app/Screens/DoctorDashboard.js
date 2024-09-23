import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native";
import { getToken } from "../services/storage";

const DoctorDashboard = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctors, setDoctors] = useState({}); // Store doctor names

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error("No token provided");

        const response = await fetch(
          "http://localhost:3000/api/appointments/dashboard",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(
            `Error: ${response.status} - ${errorResponse.message}`
          );
        }

        const data = await response.json();
        setAppointments(data);
        await fetchDoctorNames(data); // Fetch doctor names
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchDoctorNames = async (appointments) => {
      const fetchedDoctors = {};
      for (const appointment of appointments) {
        const doctorResponse = await fetch(
          `http://localhost:3000/api/doctors/${appointment.doctor_id}`
        );
        if (doctorResponse.ok) {
          const doctorData = await doctorResponse.json();
          fetchedDoctors[appointment.doctor_id] = doctorData.name; // Assuming doctor data has a 'name' property
        }
      }
      setDoctors(fetchedDoctors);
    };

    fetchAppointments();
  }, []);

  const deleteAppointment = async (appointmentId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/appointments/appointmentId?${appointmentId}`, // Corrected URL
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
        prev.filter((appointments) => appointments.id !== appointmentId)
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
            renderItem={({ item }) => (
              <View style={styles.appointment}>
                <Text style={styles.doctor_id}>
                  <Text style={styles.title1}>Doctor ID: </Text>
                  {item.doctor_id}
                </Text>

                <Text style={styles.patientName}>
                  <Text style={styles.title1}>Patient Name: </Text>
                  {item.patient_name}
                </Text>
                <Text style={styles.time}>
                  <Text style={styles.title1}>Date & Time: </Text>
                  {item.time}
                </Text>
                <Text style={styles.status(item.status)}>
                  <Text style={styles.title1}>Status: </Text>
                  {item.status}
                </Text>

                <View style={styles.buttonContainer}>
                  <Button
                    title="Delete"
                    onPress={() => deleteAppointment(item.id)}
                    color="#dc3545" // Red for delete button
                  />
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa", // Light background
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#343a40",
  },
  title1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#343a40",
  },
  profileIcon: {
    fontSize: 28,
  },
  section: {
    flex: 1,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#495057",
  },
  appointment: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  patientName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff", // Blue for patient name
    marginBottom: 4,
  },
  time: {
    fontSize: 16,
    color: "#6c757d", // Muted color for time
    marginBottom: 4,
  },
  status: (status) => ({
    fontSize: 14,
    fontWeight: "bold",
    color:
      status === "confirmed"
        ? "#28a745" // Green for confirmed
        : status === "Scheduled"
        ? "#17e0f8" // blue for scheduled
        : status === "pending"
        ? "#ffc107" // Yellow for pending
        : "#dc3545", // Red for other statuses (like cancelled)
    textTransform: "capitalize",
  }),
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 20,
  },
  noAppointments: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center", // Center the button horizontally
    marginTop: 10, // Optional: Add some space above the button
  },
});

export default DoctorDashboard;
