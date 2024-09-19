import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Adjust the URL as per your backend

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};

const signup = async (email, name, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      email,
      name,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Signup API error:", error);
    throw error;
  }
};

export default { login, signup };
