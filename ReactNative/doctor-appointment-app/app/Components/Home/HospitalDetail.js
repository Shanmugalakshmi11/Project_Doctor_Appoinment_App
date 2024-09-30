import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

const HospitalDetail = ({ route }) => {
  const { id } = route?.params || {}; // Extract hospital ID from route params

  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("No hospital ID provided");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:3000/api/hospitals/id?hospitalId=${id}`) // Adjust URL if needed
      .then((response) => {
        const fetchedHospital = response.data.premium_hospitals; // Adjust response structure if needed
        if (fetchedHospital) {
          setHospital(fetchedHospital);
        } else {
          setError("Hospital details not found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load hospital details. Please try again.");
        setLoading(false);
        console.error("Error fetching hospital details:", error);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text>Loading hospital details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!hospital) {
    return (
      <View style={styles.container}>
        <Text>No hospital details available.</Text>
      </View>
    );
  }

  // Destructure hospital object to make code cleaner
  const { name, address, rating, description } = hospital;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Hospital Details</Text>
      <Text style={styles.title}>{name || "Unnamed Hospital"}</Text>
      <Text style={styles.address}>{address || "No address available"}</Text>
      <Text style={styles.rating}>Rating: {rating || "N/A"}/5</Text>
      <Text style={styles.description}>
        {description || "No description available."}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
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
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default HospitalDetail;
