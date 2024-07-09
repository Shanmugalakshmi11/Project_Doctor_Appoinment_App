import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import app from "./../../assets/images/app.jpg";
import SignInWithOAuth from "@/components/SignInWithOAuth";

export default function Login() {
  return (
    <View style={{ alignItems: "center" }}>
      <Image source={app} style={styles.appImage} />
      <View style={styles.container}>
        <Text style={styles.heading}>Your Ultimate Doctor</Text>
        <Text style={styles.heading}>Appointment Booking App</Text>
        <Text style={styles.description}>
          Book Appointment Effortlessly and manage your health journey
        </Text>
        <SignInWithOAuth />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appImage: {
    width: 300,
    height: 500,
    resizeMode: "contain",
    marginTop: 20, // You can define marginTop here
  },
  container: {
    backgroundColor: "#000",
    padding: 25,
    alignItems: "center",
    marginTop: -50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    textAlign: "center",
    marginTop: 20,
    color: "#fff", // Ensuring text color is visible on black background
  },
  button: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 90,
    alignItems: "center",
    marginTop: 20,
    width: Dimensions.get("screen").width * 0.8,
  },
  buttonText: {
    fontSize: 17,
    color: "black", // Wrapped in quotes
  },
});
