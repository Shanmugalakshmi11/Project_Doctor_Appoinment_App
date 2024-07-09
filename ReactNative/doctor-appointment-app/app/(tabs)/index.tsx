import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  Platform,
  View,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import Login from "../Screens/Login";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import SignInWithOAuth from "@/components/SignInWithOAuth";
import Home from "../Screens/Home";

export default function HomeScreen() {
  return (
    <ClerkProvider
      publishableKey={
        "pk_test_Zmx1ZW50LXdhbGxleWUtNzQuY2xlcmsuYWNjb3VudHMuZGV2JA"
      }
    >
      <SafeAreaView style={styles.Container}>
        <SignedIn>
          <Home />
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
