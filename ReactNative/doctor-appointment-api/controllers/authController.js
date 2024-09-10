const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Hello", name, email, password);
  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("backend", email, password);
  try {
    const users = await User.findOne({ where: { email } });

    // Log the retrieved user object
    console.log("Retrieved user:", users);

    if (!users) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Log the password fields
    console.log("Password from request:", password);
    console.log("Hashed password from user:", users.password);

    const isMatch = await bcrypt.compare(password, users.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: users.id, email: users.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
