import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { getToken, removeToken } from "../services/storage"; // Make sure to adjust this import
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error("No token provided");

        const response = await axios.get(
          "http://localhost:3000/api/admin/userprofile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (err) {
        console.error("Error fetching user profile:", err.response || err);

        // Check for expired token
        if (err.response && err.response.status === 401) {
          Alert.alert(
            "Session Expired",
            "Your session has expired. Please log in again.",
            [
              {
                text: "OK",
                onPress: async () => {
                  await removeToken(); // Clear the token from storage
                  // Redirect to login page or perform other actions
                },
              },
            ]
          );
        } else {
          setError(err.response ? err.response.data.message : err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const token = await getToken();
      if (!token) throw new Error("No token provided");

      const response = await axios.put(
        "http://localhost:3000/api/admin/put/userprofile",
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert(
        "Profile Updated",
        "Your profile has been updated successfully."
      );
      setUserData(response.data);
    } catch (err) {
      console.error("Error updating profile:", err.response || err);

      // Handle the error similar to fetchUserProfile
      if (err.response && err.response.status === 401) {
        Alert.alert(
          "Session Expired",
          "Your session has expired. Please log in again.",
          [
            {
              text: "OK",
              onPress: async () => {
                await removeToken();
                // Redirect to login page or perform other actions
              },
            },
          ]
        );
      } else {
        setError(err.response ? err.response.data.message : err.message);
      }
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update User Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Update Profile" onPress={handleUpdateProfile} />
      {error && <Text style={styles.errorText}>{error}</Text>}
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
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default Profile;
