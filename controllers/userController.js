const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// Admin-only: create a user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: "All fields required" });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, error: "Email exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: role || "user" });
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to create user" });
  }
};

// Admin-only: list all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch users" });
  }
};

// Admin-only: delete a user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to delete user" });
  }
};
