import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState("Dermatology"); // Default category
  const [doctors, setDoctors] = useState([]); // State for doctors
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Category data
  const categories = [
    {
      id: "1",
      name: "Cardiology",
      icon: require("../../../assets/images/heart.png"),
    },
    {
      id: "2",
      name: "Dermatology",
      icon: require("../../../assets/images/skin.jpeg"),
    },
    {
      id: "3",
      name: "Pediatrics",
      icon: require("../../../assets/images/child.png"),
    },
    {
      id: "4",
      name: "Neurology",
      icon: require("../../../assets/images/brain.jpeg"),
    },
    {
      id: "5",
      name: "Ortho",
      icon: require("../../../assets/images/bone.png"),
    },
    {
      id: "6",
      name: "Gyno",
      icon: require("../../../assets/images/woman.png"),
    },
  ];

  // Fetch doctors whenever the selected category changes
  useEffect(() => {
    fetchDoctors(selectedCategory);
  }, [selectedCategory]);

  // Function to fetch doctors based on category
  const fetchDoctors = async (category) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/doctors/specialty?specialty=${category}`
      );

      // Log the entire response to understand its structure
      console.log("API response:", JSON.stringify(response.data, null, 2));

      if (response.status === 200) {
        // Assuming the response structure contains doctors in this format
        const doctorData = response.data?.doctors || []; // Adjust based on your actual response structure
        console.log("Fetched Doctors data:", doctorData); // Log the fetched doctors data
        setDoctors(doctorData); // Set the state with the doctors data
      } else {
        setError("Unexpected response status");
        console.warn("Unexpected response status:", response);
      }
    } catch (err) {
      if (err.response) {
        setError(
          `Error: ${err.response.data.message || "Failed to fetch doctors"}`
        );
      } else if (err.request) {
        setError("No response received from server");
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };
  console.log(doctors);
  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.name &&
                styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedCategory(category.name)} // Set selected category and fetch doctors
          >
            <Image source={category.icon} style={styles.categoryIcon} />
            <Text style={styles.categoryButtonText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading doctors...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : !doctors ? (
        <Text style={styles.noDoctorsText}>No doctors found</Text>
      ) : (
        <FlatList
          style={styles.FlatlistContainer}
          data={doctors}
          keyExtractor={(item) =>
            item?.id ? item.id.toString() : Math.random().toString()
          } // Ensure unique keys
          renderItem={({ item }) => {
            console.log("Rendering doctor:", item);
            return (
              <View style={styles.doctorContainer}>
                <Text style={styles.doctorName}>
                  Name: {item?.name || "N/A"}
                </Text>
                <Text style={styles.doctorDetails}>
                  Experience: {item.experience || "N/A"} years
                </Text>
                <Text style={styles.doctorDetails}>
                  Email: {item.email || "No email provided"}
                </Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  selectedCategoryButton: {
    backgroundColor: "#4CAF50",
  },
  categoryIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  categoryButtonText: {
    fontSize: 16,
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  noDoctorsText: {
    fontSize: 18,
    textAlign: "center",
    color: "#333",
  },
  FlatlistContainer: {
    backgroundColor: "red",
  },
  doctorContainer: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 2,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  doctorDetails: {
    fontSize: 16,
    color: "#555",
  },
});

export default CategoryList;
