import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { getToken } from "../services/storage"; // Adjust path as needed

const DoctorDashboard = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error("No token provided"); // Ensure you have a function to get the token

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
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        setAppointments(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

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
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.appointment}>
              <Text style={styles.patientName}>{item.patientName}</Text>
              <Text>{item.time}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
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
    marginBottom: 8,
  },
  appointment: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DoctorDashboard;
