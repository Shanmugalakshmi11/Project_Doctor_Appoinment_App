import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import LoginForm from "../Components/Home/LoginForm";
import SignupForm from "../Components/Home/SignupForm";
import app from "../../assets/images/app.jpg";
import axios from "axios";

const LoginSignupPage = ({ navigation, onLogin, onSignup }) => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        onLogin(email, password);
        navigation.navigate("Home"); // Navigate to the Home screen after successful login
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleSignup = async (email, name, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          email,
          name,
          password,
        }
      );
      if (response.data.success) {
        onSignup(email, name, password);
        navigation.navigate("Home"); // Navigate to the Home screen after successful signup
      } else {
        console.error("Signup failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={app} style={styles.appImage} />
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Your Ultimate Doctor</Text>
        <Text style={styles.heading}>Appointment Booking App</Text>
        <Text style={styles.description}>
          {isSignup
            ? "Create an account to start booking appointments effortlessly."
            : "Log in to manage your health journey and book appointments."}
        </Text>

        {isSignup ? (
          <SignupForm onSignup={handleSignup} />
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}

        <TouchableOpacity onPress={toggleForm}>
          <Text style={styles.toggleText}>
            {isSignup
              ? "Already have an account? Log In"
              : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  appImage: {
    width: 300,
    height: 500,
    resizeMode: "contain",
    marginTop: 20,
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 25,
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    textAlign: "center",
    marginTop: 20,
    color: "#555",
  },
  toggleText: {
    marginTop: 20,
    color: "blue",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default LoginSignupPage;
