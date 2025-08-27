require("dotenv").config();
const connectDB = require("./config/db");
const User = require("./models/userModel");
const Expense = require("./models/expenseModel");
const bcrypt = require("bcryptjs");

connectDB();

async function seed() {
  try {
    await User.deleteMany();
    await Expense.deleteMany();

    const hashed = await bcrypt.hash("1234", 10);

    const users = await User.insertMany([
      { name: "Admin", email: "admin@mail.com", password: hashed, role: "admin" },
      { name: "User One", email: "user@mail.com", password: hashed, role: "user" },
      { name: "User Two", email: "user2@mail.com", password: hashed, role: "user" },
    ]);

    await Expense.insertMany([
      { user: users[1]._id, amount: 250, category: "Food", date: "2025-08-26", description: "Lunch", shared: true },
      { user: users[2]._id, amount: 1200, category: "Travel", date: "2025-08-20", description: "Cab to airport", shared: false },
      { user: users[0]._id, amount: 900, category: "Bills", date: "2025-08-22", description: "Internet bill", shared: true },
    ]);

    console.log("Seed completed!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
