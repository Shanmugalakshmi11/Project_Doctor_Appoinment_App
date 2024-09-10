import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Replace with the path to your profile image
const headerImage = require("../../../assets/images/profile.png");

const Header = ({ name, onLogout }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.userInfo}>
        <Image source={headerImage} style={styles.userImage} />
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Hello 👋</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={onLogout}>
          <Ionicons name="log-out-outline" size={28} color="black" />
        </TouchableOpacity>
        <Ionicons name="notifications-outline" size={28} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
  },
  greetingContainer: {
    flexDirection: "column",
  },
  greeting: {
    fontSize: 16,
    color: "#555",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Header;
