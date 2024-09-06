import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import TabNavigation from "../Navigations/TabNavigation";
import Login from "../Screens/Login";
import { StatusBar } from "expo-status-bar";
import Header from "../Components/Home/Header";
import SearchBar from "../Components/Home/SearchBar";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleLogin = () => {
    setIsSignedIn(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      {isSignedIn && (
        <>
          <Header />
          <SearchBar />
        </>
      )}
      {isSignedIn ? <TabNavigation /> : <Login onLogin={handleLogin} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
