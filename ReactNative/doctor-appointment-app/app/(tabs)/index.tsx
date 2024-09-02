import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  Platform,
  View,
} from "react-native";

import { HelloWave } from "@/app/Components/HelloWave";
import ParallaxScrollView from "@/app/Components/ParallaxScrollView";
import { ThemedText } from "@/app/Components/ThemedText";
import { ThemedView } from "@/app/Components/ThemedView";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import Login from "../Screens/Login";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import SignInWithOAuth from "@/app/Components/SignInWithOAuth";
import Home from "../Screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "../Navigations/TabNavigation";

export default function HomeScreen() {
  return (
    <ClerkProvider
      publishableKey={
        "pk_test_Zmx1ZW50LXdhbGxleWUtNzQuY2xlcmsuYWNjb3VudHMuZGV2JA"
      }
    >
      <SafeAreaView style={styles.Container}>
        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <Login />
        </SignedOut>
      </SafeAreaView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
