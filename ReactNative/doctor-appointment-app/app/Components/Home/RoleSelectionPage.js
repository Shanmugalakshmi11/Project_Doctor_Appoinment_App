import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const RoleSelectionPage = ({ onRoleSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Role</Text>
      <Button title="Doctor" onPress={() => onRoleSelect("doctor")} />
      <Button title="Admin" onPress={() => onRoleSelect("admin")} />
      <Button title="User" onPress={() => onRoleSelect("user")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default RoleSelectionPage;
