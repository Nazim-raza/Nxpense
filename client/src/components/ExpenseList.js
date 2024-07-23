// client/src/components/ExpenseList.js
import React, { useContext } from 'react';
import ExpenseContext from '../context/ExpenseContext';

const ExpenseList = () => {
  const { expenses, loading, error } = useContext(ExpenseContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense._id}>
          {expense.description} - ${expense.amount} paid by {expense.payer}
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
