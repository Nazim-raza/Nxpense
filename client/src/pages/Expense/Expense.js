import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auths";

export const Expense = () => {
  const [input, setInput] = useState({ note: "", amount: "" });
  const [auth] = useAuth();
  const [expenses, setExpenses] = useState([]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  //Adding expenses
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.note || !input.amount) {
      alert("Please fill all details");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `${auth.token}`,
        },
      };
      const res = await axios.post(
        "/api/v1/expense/add-expense",
        input,
        config
      );
      alert("Expense Added");
    } catch (error) {
      console.log(error);
    }
  };

  //Render Expenses List
  useEffect(() => {
    const getExpenses = async () => {
      try {
        const config = {
          headers: {
            Authorization: `${auth.token}`,
          },
        };
        const exp = await axios.get("/api/v1/expense/get-expenses", config);
        setExpenses(exp.data.expenses);
        console.log(exp.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (auth?.token) getExpenses();
  }, [auth?.token]);

  //======handledelete=======
  const handledelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `${auth.token}`,
        },
      };
      const delExpense = await axios.delete(
        `/api/v1/expense/del-expense/${id}`,
        config
      );

      setExpenses(expenses.filter((ex) => ex._id !== id));
      alert("Expense deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>My Expenses</h2>

      <form onSubmit={handleSubmit}>
        <h3>|| Add Expenses ||</h3>

        <div className="mb-3">
          <input
            placeholder="Add Note"
            type="text"
            name="note"
            onChange={handleChange}
            className="form-control"
            id="expenseNote"
          />
        </div>

        <div className="mb-3">
          <input
            placeholder="Enter amount"
            type="number"
            name="amount"
            onChange={handleChange}
            className="form-control"
            id="expenseamount"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Expense
        </button>
      </form>
      <ul>
        {expenses.length > 0 ? (
          expenses?.map((ex) => (
            <li key={ex._id}>
              {ex.note}: ${ex.amount}
              <button onClick={() => handledelete(ex._id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No expenses found.</li>
        )}
      </ul>
    </div>
  );
};
