import React from "react";
import { Allusers } from "./Allusers";
import { Groups } from "./Group/Groups";
import { Navbar } from "../components/Navbar";
import { CreateGroup } from "./Group/CreateGroup";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Allusers />
      <CreateGroup />
    </div>
  );
};

export default Home;
