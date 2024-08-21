import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import { Groups } from "./pages/Group/Groups";
import { Groupinfo } from "./pages/Group/Groupinfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Register />} />
        <Route path="/group" element={<Groups />} />
        <Route path="/group/:groupid" element={<Groupinfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
