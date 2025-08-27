const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Register user
async function registerUser({ name, email, password }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  return { message: "User registered successfully" };
}

// Login user
async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

  return { token, user: { id: user._id, name: user.name, email: user.email } };
}

module.exports = {
  registerUser,
  loginUser,
};
