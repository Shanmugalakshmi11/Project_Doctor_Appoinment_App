import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

const apiService = {
  login: async (email, password) => {
    console.log("EMAIL&Pass", email, password);
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      console.log(email, password);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      throw error;
    }
  },

  signup: async (email, name, password) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        name,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default apiService;
