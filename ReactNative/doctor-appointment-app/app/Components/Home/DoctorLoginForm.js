import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { setToken } from "../../services/storage";

// Validation Schema for Login
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const DoctorLoginForm = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email, password) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/doctor/login",
        {
          email,
          password,
          userType: "doctors",
        }
      );
      if (response.data.token) {
        setToken(response.data.token);
        onLogin(email, "doctors"); // Handle successful login
      } else {
        console.error("No token received");
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data.message : error.message
      );
      Alert.alert(
        "Login Error",
        "An error occurred while trying to log in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        handleLogin(values.email, values.password);
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />
          {touched.email && errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
          />
          {touched.password && errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}

          <Button
            title={loading ? "Logging in..." : "Login"}
            onPress={handleSubmit}
            disabled={loading}
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
});

export default DoctorLoginForm;
