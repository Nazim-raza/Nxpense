// client/src/context/ExpenseContext.js
import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const ExpenseContext = createContext();

const initialState = {
  expenses: [],
  loading: true,
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, expenses: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/expenses/all');
        dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: err.message });
      }
    };
    fetchData();
  }, []);

  const addExpense = async (expense) => {
    try {
      const res = await axios.post('/api/expenses/add', expense);
      dispatch({ type: 'ADD_EXPENSE', payload: res.data });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <ExpenseContext.Provider value={{ ...state, addExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
