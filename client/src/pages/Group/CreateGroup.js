import React, { useState } from "react";
import axios from "axios";
import { AutoComplete, Input } from "antd";
import { useAuth } from "../../context/auths";

export const CreateGroup = () => {
  const [input, setInput] = useState({ name: "", userIds: [] });
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
        value: user._id,
        label: user.name,
      }));
      setOptions(users);
    } catch (error) {
      console.log("Error fetching user suggestions:", error);
    }
  };

  const handleSelect = (value) => {
    // Add selected user's ID to the userIds array
    setInput((prevInput) => ({
      ...prevInput,
      userIds: [...prevInput.userIds, value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.name || input.userIds.length === 0) {
      alert("Please fill all details");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `${auth.token}`,
        },
      };
      const res = await axios.post("/api/v1/group/create-group", input, config);
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
            onSelect={handleSelect} // Add this line to handle user selection
            placeholder="Add Username or Email"
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
