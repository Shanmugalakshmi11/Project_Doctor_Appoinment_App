import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import LoginForm from "../Components/Home/LoginForm";
import app from "./../../assets/images/app.jpg";

const Login = ({ onLogin }) => {
  return (
    <View style={styles.container}>
      <Image source={app} style={styles.appImage} />
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Your Ultimate Doctor</Text>
        <Text style={styles.heading}>Appointment Booking App</Text>
        <Text style={styles.description}>
          Book Appointment Effortlessly and manage your health journey
        </Text>
        <LoginForm onLogin={onLogin} />
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
});

export default Login;
