import React from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const sliderData = [
  {
    id: "1",
    title: "Dr. John Doe",
    specialty: "Cardiologist",
    image: require("../../../assets/images/cardio_doctor.png"),
  },
  {
    id: "2",
    title: "Dr. Jane Smith",
    specialty: "Dermatologist",
    image: require("../../../assets/images/Dermatologist_doctor.jpeg"),
  },
  {
    id: "3",
    title: "Dr. Emily Johnson",
    specialty: "Pediatrician",
    image: require("../../../assets/images/Pediatrician_doctor.jpeg"),
  },
];

export default function Slider() {
  const renderItem = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: "lightblue" }]}>
      <Text>{item.title}</Text>
      <Text>{item.specialty}</Text>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sliderData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        snapToInterval={screenWidth * 0.09 + 2}
        decelerationRate="fast"
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
    paddingHorizontal: 10,
  },
  slide: {
    marginHorizontal: 5,
    alignItems: "center",
  },
  image: {
    width: screenWidth * 0.2,
    height: 250,
    borderRadius: 10,
  },
});
