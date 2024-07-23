// client/src/App.js
import React from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';

const App = () => (
  <ExpenseProvider>
    <div>
      <h1>Expense Management App</h1>
      <ExpenseForm />
      <ExpenseList />
    </div>
  </ExpenseProvider>
);

export default App;
