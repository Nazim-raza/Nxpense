import React from "react";
import { Allusers } from "./Allusers";
import { Groups } from "./Group/Groups";
import { Navbar } from "../components/Navbar";
import { CreateGroup } from "./Group/CreateGroup";
import Login from "./Login";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Login />
    </div>
  );
};

export default Home;
