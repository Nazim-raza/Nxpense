import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import { Groups } from "./pages/Group/Groups";
import { Groupinfo } from "./pages/Group/Groupinfo";
import { Allusers } from "./pages/Allusers";
import { CreateGroup } from "./pages/Group/CreateGroup";
import { Expense } from "./pages/Expense/Expense";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/allusers" element={<Allusers />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<Register />} />
      <Route path="/group" element={<Groups />} />
      <Route path="/create-group" element={<CreateGroup />} />
      <Route path="/expense" element={<Expense />} />

      <Route path="/group/:groupid" element={<Groupinfo />} />
    </Routes>
  );
}

export default App;
