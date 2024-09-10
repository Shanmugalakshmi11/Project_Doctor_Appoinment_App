import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import TabNavigation from "../Navigations/TabNavigation";
import LoginSignupPage from "../Screens/LoginSignupPage";
import Header from "../Components/Home/Header";
import SearchBar from "../Components/Home/SearchBar";

import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiService from "../services/apiService"; // Import ApiService

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedLoginStatus = await AsyncStorage.getItem("isSignedIn");
        const storedUserName = await AsyncStorage.getItem("userName");

        if (storedLoginStatus === "true") {
          setIsSignedIn(true);
          setUserName(storedUserName || "");
        }
      } catch (error) {
        console.error("Failed to fetch login status or user name", error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const data = await apiService.login(email, password); // Call API service
      console.log("data", data);
      if (data.token) {
        setIsSignedIn(true);
        setUserName(data.user.name); // Assuming the API response contains a user object with a name property
        await AsyncStorage.setItem("isSignedIn", "true");
        await AsyncStorage.setItem("userName", data.user.name);
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.log("hello", email, password);
      console.error("Login Error:", error);
    }
  };

  const handleSignup = async (email, name, password) => {
    try {
      const data = await apiService.signup(email, name, password); // Call API service
      if (data.success) {
        setIsSignedIn(true);
        setUserName(name);
        await AsyncStorage.setItem("isSignedIn", "true");
        await AsyncStorage.setItem("userName", name);
      } else {
        console.error("Signup failed:", data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      setIsSignedIn(false);
      setUserName("");
      await AsyncStorage.removeItem("isSignedIn");
      await AsyncStorage.removeItem("userName");
    } catch (error) {
      console.error("Failed to clear login status or user name", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      {isSignedIn ? (
        <>
          <Header userName={userName} onLogout={handleLogout} />
          <SearchBar />
          <TabNavigation />
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
});

export default App;
