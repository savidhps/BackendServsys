const Expense = require("../models/expenseModel");

// Add Expense
exports.addExpense = async (req, res) => {
  try {
    const { amount, category, date, description, shared } = req.body;

    if (!amount || !category || !date) {
      return res.status(400).json({ success: false, error: "Amount, category, and date are required" });
    }

    const expense = new Expense({
      user: req.user.id,
      amount,
      category,
      date,
      description: description || "",
      shared: shared || false,
    });

    await expense.save();

    res.status(201).json({ success: true, data: expense });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get Expenses for logged-in user
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json({ success: true, data: expenses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete Expense by ID
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!expense) return res.status(404).json({ success: false, error: "Expense not found" });

    res.json({ success: true, message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
