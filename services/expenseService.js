const Expense = require("../models/expenseModel");

exports.addExpense = async (userId, data) => {
  const expense = new Expense({ ...data, user: userId });
  return await expense.save();
};

exports.getExpenses = async (userId) => {
  return await Expense.find({ user: userId }).sort({ date: -1 });
};

exports.deleteExpense = async (userId, expenseId) => {
  return await Expense.findOneAndDelete({ _id: expenseId, user: userId });
};
