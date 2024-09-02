import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigtor } from "@react-navigation/bottom-tabs";
import Appointment from "../Screens/Appointment";
import Profile from "../Screens/Profile";
import Home from "../Screens/Home";

const Tab = createBottomTabNavigtor;

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Appointment" component={Appointment} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
