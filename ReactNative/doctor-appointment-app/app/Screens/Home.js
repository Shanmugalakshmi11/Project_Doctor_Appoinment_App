import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "../Components/Home/Slider";
import CategoryList from "../Components/Home/CategoryList";
import PremiumHospital from "../Components/Home/PremiumHospital";
import StackNavigation from "../Navigations/StackNavigation";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Here, you can load the doctors related to the selected category
    console.log("Selected Category:", category);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <CategoryList onCategorySelect={handleCategorySelect} />
      <Slider />
      <PremiumHospital />

      {selectedCategory && (
        <Text style={styles.selectedCategory}>
          Showing doctors for: {selectedCategory}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#ADD8E6",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  selectedCategory: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default Home;
