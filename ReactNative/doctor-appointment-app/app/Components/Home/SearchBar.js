import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={28} color="black" />
        <TextInput style={styles.input} placeholder="Search" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.6,
    borderColor: "gray",
    padding: 8,
    borderRadius: 8,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
});
