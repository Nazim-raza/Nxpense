import express from "express";
import { addExpense } from "../controllers/expenseController.js";

const router = express.Router();

//routes
router.post("/add-expense", addExpense);

export default router;
