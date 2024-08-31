import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style/Allusers.css";
import { Groups } from "./Group/Groups";
import { useAuth } from "../context/auths";

export const Allusers = () => {
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const getUser = async () => {
      try {
        const config = {
          headers: {
            Authorization: `${auth.token}`,
          },
        };
        const res = await axios.get("/api/v1/user/getusers", config);
        setUsers(res.data.users);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (auth?.token) getUser();
  }, [auth?.token]);

  useEffect(() => {
    // Add a class to the body when the component mounts
    document.body.classList.add("allusers-page-body");

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove("allusers-page-body");
    };
  }, []);

  return (
    <>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Groups />
      </div>
    </>
  );
};
