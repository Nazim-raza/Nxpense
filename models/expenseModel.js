// server/models/Expense.js
import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  payer: { type: String, required: true },
  sharedWith: { type: [String], required: true }
});

export default mongoose.model('Expense', ExpenseSchema);
