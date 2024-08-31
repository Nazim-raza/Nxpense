import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: [true, "amount Required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
