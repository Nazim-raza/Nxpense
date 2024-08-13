import React from "react";
import { useEffect } from "react";
import "../style/Login.css";

const Login = () => {
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
      <form>
        <h3>|| Login Now ||</h3>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
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

export default Login;
