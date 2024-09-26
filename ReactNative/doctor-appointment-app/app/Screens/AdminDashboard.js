import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import { getToken } from "../services/storage";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    password: "",
    specialty: "",
    experience: "",
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error("No token provided");

        const response = await fetch(
          "http://localhost:3000/api/admin/doctors",
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
        setDoctors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const addDoctor = async () => {
    try {
      const token = await getToken();
      const response = await fetch("http://localhost:3000/api/admin/doctors", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDoctor),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Error: ${response.status} - ${errorResponse.message}`);
      }

      const addedDoctor = await response.json();
      setDoctors((prev) => [...prev, addedDoctor]);
      setNewDoctor({
        name: "",
        email: "",
        password: "",
        specialty: "",
        experience: "",
      });
      setModalVisible(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteDoctor = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/doctors/doctorId?id=${id}`,
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

      setDoctors((prev) => prev.filter((doctor) => doctor.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.errorText}>Oops! {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <View style={styles.buttonContainer}>
        <Button title="Add New Doctor" onPress={() => setModalVisible(true)} />
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Name</Text>
          <Text style={styles.headerText}>Email</Text>
          <Text style={styles.headerText}>Specialty</Text>
          <Text style={styles.headerText}>Experience</Text>
          <Text style={styles.headerText}>Actions</Text>
        </View>
        <FlatList
          data={doctors}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.rowText}>{item.name}</Text>
              <Text style={styles.rowText}>{item.email}</Text>
              <Text style={styles.rowText}>{item.specialty}</Text>
              <Text style={styles.rowText}>{item.experience} years</Text>
              <View style={styles.actionsContainer}>
                <Button title="Delete" onPress={() => deleteDoctor(item.id)} />
              </View>
            </View>
          )}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            placeholder="Doctor Name"
            value={newDoctor.name}
            onChangeText={(text) => setNewDoctor({ ...newDoctor, name: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Doctor Email"
            value={newDoctor.email}
            onChangeText={(text) => setNewDoctor({ ...newDoctor, email: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={newDoctor.password}
            onChangeText={(text) =>
              setNewDoctor({ ...newDoctor, password: text })
            }
            secureTextEntry
            style={styles.input}
          />
          <TextInput
            placeholder="Specialty"
            value={newDoctor.specialty}
            onChangeText={(text) =>
              setNewDoctor({ ...newDoctor, specialty: text })
            }
            style={styles.input}
          />
          <TextInput
            placeholder="Experience (years)"
            value={newDoctor.experience}
            onChangeText={(text) =>
              setNewDoctor({ ...newDoctor, experience: text })
            }
            keyboardType="numeric"
            style={styles.input}
          />
          <Button title="Add Doctor" onPress={addDoctor} />
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tableContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "green",
    padding: 10,
  },
  headerText: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },
  headerTextLast: {
    borderRightWidth: 0, // No border for the last header cell
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  rowText: {
    flex: 1,
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },
  actionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    width: "80%",
    paddingHorizontal: 10,
  },
  closeButton: {
    color: "#2196F3",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center", // Center the button horizontally
    marginVertical: 20, // Optional: Adds some space around the button
  },
});

export default AdminDashboard;
