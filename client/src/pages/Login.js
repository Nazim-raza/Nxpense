import React, { useState } from "react";
import { useEffect } from "react";
import "../style/Login.css";
import axios from "axios";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.email || !input.password) {
      alert("please fill all details");
      return;
    }
    try {
      const res = await axios.post("/api/v1/user/login", input);
      alert("Login Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Add a class to the body when the component mounts
    document.body.classList.add("login-page-body");

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove("login-page-body");
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>|| Login Now ||</h3>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
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
            type="password"
            name="password"
            onChange={handleChange}
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

export default Login;
