import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

// Sample data with icons for each category
const categories = [
  {
    id: "1",
    name: "Cardiologist",
    icon: require("../../../assets/images/heart.png"),
  },
  {
    id: "2",
    name: "Dermatologist",
    icon: require("../../../assets/images/skin.jpeg"),
  },
  {
    id: "3",
    name: "Pediatrician",
    icon: require("../../../assets/images/child.png"),
  },
  {
    id: "4",
    name: "Neurologist",
    icon: require("../../../assets/images/brain.jpeg"),
  },
  {
    id: "5",
    name: "Orthopedic",
    icon: require("../../../assets/images/bone.png"),
  },
  {
    id: "6",
    name: "Gynecologist",
    icon: require("../../../assets/images/woman.png"),
  },
];

export default function CategoryList({ onCategorySelect }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => onCategorySelect(item.name)}
    >
      <View style={styles.iconContainer}>
        <Image source={item.icon} style={styles.icon} />
      </View>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  categoryItem: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
    textAlign: "center",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#eaf4fa",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
  },
});
