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
    required: true,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true, // Ensure that every expense is linked to a group
  },
  splits: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      amount: { type: Number },
    },
  ],
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
