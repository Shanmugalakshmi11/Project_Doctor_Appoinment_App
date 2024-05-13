import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import app from "./../../assets/images/icon.png";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Login() {
  return (
    <View style={{ alignItems: "center" }}>
      <Image source={app} style={styles.appImage} />
      <View
        style={{
          backgroundColor: "#000",
          padding: 25,
          alignItems: "center",
          marginTop: -50,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Text style={styles.heading}>Your Ultimate Doctor</Text>
        <Text style={styles.heading}>Appointment Booking App</Text>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Book Appointment Effortlessly and manager your healthJourney
        </Text>
        <TouchableOpacity
          onPress={() => console.log("Clicked")}
          style={{
            padding: 16,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 90,
            alignItems: "Center",
            marginTop: 20,
            width: Dimensions.get("screen").width * 0.8,
          }}
        >
          <Text style={{ fontSize: 17, color: Colors.white }}>
            Login with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appImage: {
    width: 300,
    height: 500,
    ObjectFit: "contain",
    marginTop,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
