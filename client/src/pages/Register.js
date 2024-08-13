import React, { useState, useEffect } from "react";
import "../style/Register.css";
import axios from "axios";

const Register = () => {
  const [input, setInput] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.name || !input.email || !input.password) {
      alert("please fill all details");
      return;
    }
    try {
      const res = await axios.post("/api/v1/user/create", input);
      if (res.status === 200) {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Add a class to the body when the component mounts
    document.body.classList.add("register-page-body");

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove("register-page-body");
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>|| Register Now ||</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Name
          </label>
          <input
            name="name"
            onChange={handleChange}
            type="text"
            className="form-control"
            id="exampleInputemail"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            name="email"
            onChange={handleChange}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            name="password"
            onChange={handleChange}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Register;
