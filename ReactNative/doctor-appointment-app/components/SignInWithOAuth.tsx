import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Button } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        //setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={() => console.log("Clicked")}
      style={styles.button}
    >
      <Text style={styles.buttonText}>Login with Google</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  appImage: {
    width: 300,
    height: 500,
    resizeMode: "contain",
    marginTop: 20, // You can define marginTop here
  },
  container: {
    backgroundColor: "#000",
    padding: 25,
    alignItems: "center",
    marginTop: -50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    textAlign: "center",
    marginTop: 20,
    color: "#fff", // Ensuring text color is visible on black background
  },
  button: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 90,
    alignItems: "center",
    marginTop: 20,
    width: Dimensions.get("screen").width * 0.8,
  },
  buttonText: {
    fontSize: 17,
    color: "black", // Wrapped in quotes
  },
});
export default SignInWithOAuth;
