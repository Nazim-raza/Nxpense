import Expense from "../models/expenseModel.js";

//Add expenses
export const addExpense = async (req, res) => {
  const { note, amount } = req.body;
  if (!note || !amount) {
    res.status(400).send("Please fill expense details");
  }
  try {
    const newExpense = new Expense(req.body);

    await newExpense.save();
    res.status(200).json({
      success: true,
      newExpense,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "expense not added",
      error,
    });
  }
};

//==========Get getExpenses==============
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({});

    if (!expenses) {
      return res.status(404).json({
        success: false,
        message: "No expenses found for this user in the group",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expenses fetched successfully",
      expenses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch expenses",
    });
  }
};

//==============Delete Expense================
export const deleteExpense = async (req, res) => {
  try {
    const eid = req.params.id;
    const expense = await Expense.findById(eid);

    if (!expense) {
      return res.status(404).send({
        success: false,
        message: "Expense not found",
      });
    }

    await Expense.findByIdAndDelete(eid);
    res.status(200).send({
      success: true,
      message: "Expense deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error deleting expense",
      error,
    });
  }
};
