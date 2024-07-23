// server/controllers/expenseController.js
import Expense from '../models/Expense.js';

export const addExpense = async (req, res) => {
  const { description, amount, payer, sharedWith } = req.body;

  try {
    const newExpense = new Expense({ description, amount, payer, sharedWith });
    const savedExpense = await newExpense.save();
    res.json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
