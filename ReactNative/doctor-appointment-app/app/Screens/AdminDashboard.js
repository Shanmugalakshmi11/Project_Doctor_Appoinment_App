import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { getToken } from "../services/storage"; // Adjust path as needed

const AdminDashboard = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = await getToken(); // Retrieve token
        if (!token) throw new Error("No token provided");

        const response = await fetch(
          "http://localhost:3000/api/admin/dashboard",
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
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>ID</Text>
        <Text style={styles.headerText}>Email</Text>
      </View>

      {/* Table Data */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()} // Adjust according to your data structure
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.rowText}>{item.id}</Text>
            <Text style={styles.rowText}>{item.email}</Text>

            {/* Add other columns if needed */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "#f1f8ff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  rowText: {
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
});

export default AdminDashboard;
