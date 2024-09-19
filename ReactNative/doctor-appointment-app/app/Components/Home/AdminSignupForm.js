import React from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Validation Schema for Admin Signup
const AdminSignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const AdminSignupForm = ({ onSignup }) => {
  const handleSignup = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/admin/signup",
        {
          email,
          password,
        }
      );
      if (response.data.token) {
        onSignup(email); // Handle successful signup
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={AdminSignupSchema}
      onSubmit={(values) => {
        handleSignup(values.email, values.password);
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

          <Button title="Sign Up" onPress={handleSubmit} />
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

export default AdminSignupForm;
