import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import LoginForm from "../Components/Home/LoginForm";
import SignupForm from "../Components/Home/SignupForm";
import AdminLoginForm from "../Components/Home/AdminLoginForm";
import AdminSignupForm from "../Components/Home/AdminSignupForm";
import DoctorLoginForm from "../Components/Home/DoctorLoginForm";
import DoctorSignupForm from "../Components/Home/DoctorSignupForm";
import app from "../../assets/images/app.jpg";

const LoginSignupPage = ({ onLogin, onSignup, navigation }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [userType, setUserType] = useState("doctors");
  const [signupMessage, setSignupMessage] = useState(""); // State for signup message
  const [loginError, setLoginError] = useState(""); // State for login error message

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setSignupMessage(""); // Clear message when toggling form
    setLoginError(""); // Clear login error message
  };

  const handleLogin = async (email, password) => {
    try {
      console.log("EMAIL", email);
      const response = await onLogin(email, password); // Assuming onLogin is an async function that takes email and password
      if (response.success) {
        if (userType === "doctors") {
          navigation.navigate("DoctorDashboard");
        } else if (userType === "admin") {
          navigation.navigate("AdminDashboard");
        } else {
          navigation.navigate("Home");
        }
      } else {
        setLoginError(response.message || "Login failed. Please try again."); // Set error message from backend response
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Server error. Please try again later.");
    }
  };

  const handleSignup = async (email) => {
    try {
      console.log("EMAIL", email);
      await onSignup(email); // Assuming onSignup is an async function
      setSignupMessage("Signup successful!"); // Set signup message
      navigation.navigate("Home");
    } catch (error) {
      console.error("Signup error:", error);
      // Handle signup error (show a message or something)
    }
  };

  const renderForm = () => {
    switch (userType) {
      case "admin":
        return isSignup ? (
          <AdminSignupForm onSignup={handleSignup} />
        ) : (
          <AdminLoginForm onLogin={handleLogin} />
        );
      case "doctors":
        return isSignup ? (
          <DoctorSignupForm onSignup={handleSignup} />
        ) : (
          <DoctorLoginForm onLogin={handleLogin} />
        );
      case "users":
      default:
        return isSignup ? (
          <SignupForm onSignup={handleSignup} />
        ) : (
          <LoginForm onLogin={handleLogin} />
        );
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

        <View style={styles.userTypeButtons}>
          <TouchableOpacity
            onPress={() => setUserType("users")}
            style={[
              styles.userTypeButton,
              userType === "users" && styles.selectedButton,
            ]}
          >
            <Text style={styles.userTypeButtonText}>User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUserType("doctors")}
            style={[
              styles.userTypeButton,
              userType === "doctors" && styles.selectedButton,
            ]}
          >
            <Text style={styles.userTypeButtonText}>Doctor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUserType("admin")}
            style={[
              styles.userTypeButton,
              userType === "admin" && styles.selectedButton,
            ]}
          >
            <Text style={styles.userTypeButtonText}>Admin</Text>
          </TouchableOpacity>
        </View>

        {renderForm()}

        {loginError ? (
          <Text style={styles.loginError}>{loginError}</Text> // Display login error message
        ) : null}

        {signupMessage ? (
          <Text style={styles.signupMessage}>{signupMessage}</Text> // Display signup message
        ) : null}

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
  userTypeButtons: {
    flexDirection: "row",
    marginBottom: 20,
  },
  userTypeButton: {
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff", // Default background color
  },
  userTypeButtonText: {
    fontSize: 16,
    color: "#000",
  },
  selectedButton: {
    backgroundColor: "#4CAF50", // Highlighted color for selected user type
    borderColor: "#4CAF50",
  },
  signupMessage: {
    marginTop: 20,
    fontSize: 16,
    color: "green",
    textAlign: "center",
  },
  loginError: {
    marginTop: 20,
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default LoginSignupPage;
