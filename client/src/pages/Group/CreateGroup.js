import axios from "axios";
import React, { useState } from "react";

export const CreateGroup = () => {
  const [input, setInput] = useState({ name: "" });
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  //Hii
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.name) {
      alert("please fill all details");
      return;
    }
    try {
      const res = await axios.post("/api/v1/group/create-group", input);
      alert("Group Created SuccessFully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>|| Create new Group ||</h3>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Enter Group Name
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Now
        </button>
      </form>
    </div>
  );
};
