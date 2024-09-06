import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const headerImage = require("../../../assets/images/profile.png");
const Header = () => {
  // You can replace these values with real user data
  const user = {
    fullname: "Shanmugalakshmi Chandrasekaran",
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.userInfo}>
        <Image source={headerImage} style={styles.userImage} />
        <Text style={styles.greeting}>Hello</Text>
        <Text style={styles.username}>{user.fullname}</Text>
      </View>
      <Ionicons name="notifications-outline" size={28} color="black" />
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
  greeting: {
    fontSize: 16,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Header;
