import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import TabNavigation from "../Navigations/TabNavigation";
import LoginSignupPage from "../Screens/LoginSignupPage";
import Header from "../Components/Home/Header";
import SearchBar from "../Components/Home/SearchBar";
import DoctorDashboard from "../Screens/DoctorDashboard";
import AdminDashboard from "../Screens/AdminDashboard";
import RoleSelectionPage from "../Components/Home/RoleSelectionPage";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("doctors"); // State to track user type

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedLoginStatus = await AsyncStorage.getItem("isSignedIn");
        const storedEmail = await AsyncStorage.getItem("email");
        const storedUserType = await AsyncStorage.getItem("userType");

        if (storedLoginStatus === "true") {
          setIsSignedIn(true);
          setEmail(storedEmail || "");
          setUserType(storedUserType || "");
        }
      } catch (error) {
        console.error("Failed to fetch login status or user type", error);
      } finally {
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      setIsSignedIn(false);
      setEmail("");
      setUserType("");
      await AsyncStorage.removeItem("isSignedIn");
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("userType");
    } catch (error) {
      console.error("Failed to clear login status or user type", error);
    }
  };

  const handleLogin = async (email: string, userType: string) => {
    try {
      setIsSignedIn(true);
      setEmail(email);
      setUserType(userType);
      await AsyncStorage.setItem("isSignedIn", "true");
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("userType", userType);
    } catch (error) {
      console.error("Failed to store login status or user type", error);
    }
  };

  const handleSignup = async (email: string, userType: string) => {
    // Handle signup logic here
    handleLogin(email, userType); // After signup, log the user in
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {isSignedIn ? (
        <>
          <Header name={email} onLogout={handleLogout} />
          <SearchBar />
          {userType === "doctors" ? (
            <DoctorDashboard onLogout={handleLogout} />
          ) : userType === "admin" ? (
            <AdminDashboard onLogout={handleLogout} />
          ) : (
            <TabNavigation />
          )}
        </>
      ) : (
        <LoginSignupPage onLogin={handleLogin} onSignup={handleSignup} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default App;
