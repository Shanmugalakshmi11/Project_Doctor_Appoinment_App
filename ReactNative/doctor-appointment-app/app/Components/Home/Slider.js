import React from "react";
import { View, Image, Dimensions, StyleSheet, FlatList } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const sliderData = [
  {
    id: "1",
    name: "Slider 1",
    imageUrl:
      "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/8/6/86522e7ddc7c519974bd5c953b54607c9c51bf2ee15ecc6d96bc512e8a5f97da/online-medical-appointment-mc-slide1.png",
    title: "Easy Booking",
    description: "Book your appointments easily with just a few clicks.",
  },
  {
    id: "2",
    name: "Slider 2",
    imageUrl:
      "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/8/6/86522e7ddc7c519974bd5c953b54607c9c51bf2ee15ecc6d96bc512e8a5f97da/online-medical-appointment-mc-slide1.png",
    title: "Available Doctors",
    description:
      "Find and choose from a wide range of doctors available near you.",
  },
  {
    id: "3",
    name: "Slider 3",
    imageUrl:
      "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/8/6/86522e7ddc7c519974bd5c953b54607c9c51bf2ee15ecc6d96bc512e8a5f97da/online-medical-appointment-mc-slide1.png",
    title: "Secure & Confidential",
    description: "Your data and appointments are kept secure and confidential.",
  },
];

export default function Slider() {
  return (
    <View style={styles.container}>
      <FlatList
        data={sliderData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          </View>
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  contentContainer: {
    paddingHorizontal: 10, // Add horizontal padding for spacing
  },
  slide: {
    marginHorizontal: 5, // Space between items
  },
  image: {
    width: screenWidth * 0.9,
    height: 170,
    borderRadius: 10,
  },
});
