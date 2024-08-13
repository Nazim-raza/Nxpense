import Expense from "../models/expenseModel.js";

export const addExpense = async (req, res) => {
  const { note, ammount } = req.body;

  if (!note || !ammount) {
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
