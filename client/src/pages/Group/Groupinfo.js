import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/auths";

export const Groupinfo = () => {
  const [groupinfo, setGroupinfo] = useState(null);
  const [expenses, setExpenses] = useState([]); // State to store group expenses
  const [input, setInput] = useState({ note: "", amount: "" });

  const { groupid } = useParams(); // Get group ID from the URL
  const [auth] = useAuth();

  // Handle input change for adding expenses
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Adding expenses
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
        `/api/v1/group/${groupid}/add-expense`,
        input,
        config
      );
      alert("Expense Added");
      setExpenses((prevExpenses) => [...prevExpenses, res.data.newExpense]); // Add the new expense to the state
      setInput({ note: "", amount: "" }); // Clear the form after submission
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch group info and expenses
  useEffect(() => {
    const getGroupinfo = async () => {
      try {
        const config = {
          headers: {
            Authorization: `${auth.token}`,
          },
        };
        const res = await axios.get(`/api/v1/group/${groupid}`, config);
        setGroupinfo(res.data);
        console.log(res.data);

        // Fetch expenses for the group
        const expenseRes = await axios.get(
          `/api/v1/group/${groupid}/expenses`,
          config
        );
        setExpenses(expenseRes.data.expenses);
      } catch (error) {
        console.log(error);
      }
    };
    if (auth?.token && groupid) {
      getGroupinfo();
    }
  }, [auth?.token, groupid]);

  if (!groupinfo) {
    // Render loading or empty state if groupinfo is null
    return <div>Loading group info...</div>;
  }

  return (
    <div>
      <h1>Group Information</h1>
      {expenses?.map((ex) => (
        <ul key={ex._id}>
          <li>
            {ex.userId.name}:-{ex.note} = {ex.amount}
          </li>
        </ul>
      ))}

      <form onSubmit={handleSubmit}>
        <h3>|| Add Expense ||</h3>
        <div className="mb-3">
          <input
            placeholder="Add Note"
            type="text"
            name="note"
            value={input.note} // Bind the value to the state
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
            value={input.amount} // Bind the value to the state
            onChange={handleChange}
            className="form-control"
            id="expenseAmount"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Expense
        </button>
      </form>
    </div>
  );
};
