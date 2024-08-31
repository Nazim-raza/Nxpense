import express from "express";
import {
  addExpense,
  deleteExpense,
  getExpenses,
} from "../controllers/expenseController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add expense --routes
router.post("/add-expense", requireSignIn, addExpense);

//Get expenses
router.get("/get-expenses", requireSignIn, getExpenses);

//Delete expenses
router.delete("/del-expense/:id", requireSignIn, deleteExpense);

export default router;
