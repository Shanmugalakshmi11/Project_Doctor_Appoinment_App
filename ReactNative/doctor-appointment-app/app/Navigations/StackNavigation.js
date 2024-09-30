// StackNavigation.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home";
import HospitalDetail from "../Components/Home/HospitalDetail"; // Import your detail screen
import CategoryList from "../Components/Home/CategoryList";

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
      <Stack.Screen
        name="HospitalDetail"
        component={HospitalDetail}
        options={{ title: "Hospital Detail" }}
      />
    </Stack.Navigator>
  );
};
export default StackNavigation;
