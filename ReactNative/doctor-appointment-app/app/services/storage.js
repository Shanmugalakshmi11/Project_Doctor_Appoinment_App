// src/services/storage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem("authToken");
  } catch (error) {
    console.error("Failed to retrieve token:", error);
    return null;
  }
};

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem("authToken", token);
  } catch (error) {
    console.error("Failed to save token:", error);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
  } catch (error) {
    console.error("Failed to remove token:", error);
  }
};
