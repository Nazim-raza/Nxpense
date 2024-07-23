// client/src/components/ExpenseForm.js
import React, { useState, useContext } from 'react';
import ExpenseContext from '../context/ExpenseContext';

const ExpenseForm = () => {
  const { addExpense } = useContext(ExpenseContext);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [payer, setPayer] = useState('');
  const [sharedWith, setSharedWith] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    addExpense({ description, amount, payer, sharedWith: sharedWith.split(',') });
    setDescription('');
    setAmount('');
    setPayer('');
    setSharedWith('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Payer"
        value={payer}
        onChange={(e) => setPayer(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Shared With (comma separated)"
        value={sharedWith}
        onChange={(e) => setSharedWith(e.target.value)}
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
