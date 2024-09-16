import React, { useState } from "react";
import axios from "axios";
import { AutoComplete, Input } from "antd";
import { useAuth } from "../../context/auths";

export const CreateGroup = () => {
  const [input, setInput] = useState({ name: "", userEmails: [] });
  const [options, setOptions] = useState([]);
  const [auth] = useAuth(); // Use the useAuth hook to get the auth context

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSearch = async (value) => {
    try {
      const config = {
        headers: {
          Authorization: `${auth.token}`,
        },
      };
      const res = await axios.get(
        `/api/v1/group/searchusers?search=${value}`,
        config
      );
      const users = res.data.map((user) => ({
        value: user.email, // Use email instead of ID for selection
        label: `${user.name} (${user.email})`,
      }));
      setOptions(users);
    } catch (error) {
      console.log("Error fetching user suggestions:", error);
    }
  };

  const handleSelect = (value) => {
    // Add selected user's email to the userEmails array if not already included
    setInput((prevInput) => ({
      ...prevInput,
      userEmails: prevInput.userEmails.includes(value)
        ? prevInput.userEmails
        : [...prevInput.userEmails, value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Automatically add the authenticated user's email to the userEmails array if not already included
    const updatedUserEmails = input.userEmails.includes(auth.user.email)
      ? input.userEmails
      : [...input.userEmails, auth.user.email];

    if (!input.name || updatedUserEmails.length === 0) {
      alert("Please fill all details");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `${auth.token}`,
        },
      };
      const res = await axios.post(
        "/api/v1/group/create-group",
        { ...input, userEmails: updatedUserEmails },
        config
      );
      alert("Group Created Successfully");
    } catch (error) {
      console.log("Error creating group:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>|| Create new Group ||</h3>

        <div className="mb-3">
          <Input
            placeholder="Enter Group Name"
            type="text"
            name="name"
            onChange={handleChange}
            className="form-control"
            id="groupName"
          />
        </div>

        <div className="mb-3">
          <AutoComplete
            options={options}
            onSearch={handleSearch}
            onSelect={handleSelect}
            placeholder="Add User Emails (Separate by commas)"
            filterOption={false}
          >
            <Input />
          </AutoComplete>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Now
        </button>
      </form>
    </div>
  );
};
