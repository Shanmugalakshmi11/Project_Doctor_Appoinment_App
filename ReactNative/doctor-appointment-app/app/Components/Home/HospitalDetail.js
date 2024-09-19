import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

const HospitalDetail = ({ route }) => {
  const { id } = route?.params || {}; // Extracting the hospital ID from route params

  const [hospital, setHospital] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("No hospital ID provided");
      return;
    }

    axios
      .get(`http://localhost:3000/api/hospitals/id?hospitalId=${id}`) // Dynamic ID in the API call
      .then((response) => {
        setHospital(response.data.premium_hospitals); // Adjust response structure if needed
      })
      .catch((error) => {
        setError("Failed to load hospital details. Please try again.");
        console.error("Error fetching hospital details:", error);
      });
  }, [id]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!hospital) {
    return (
      <View style={styles.container}>
        <Text>Loading hospital details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{hospital.name}</Text>
      <Text style={styles.address}>{hospital.address}</Text>
      <Text style={styles.rating}>Rating: {hospital.rating}/5</Text>
      <Text style={styles.description}>{hospital.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  address: {
    fontSize: 18,
    color: "#7f8c8d",
    marginBottom: 10,
  },
  rating: {
    fontSize: 18,
    color: "#f1c40f",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#2c3e50",
  },
});

export default HospitalDetail;
