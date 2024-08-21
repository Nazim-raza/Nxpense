import axios from "axios";
import React, { useEffect, useState } from "react";
import { Groupinfo } from "./Groupinfo";
import { useNavigate } from "react-router-dom";

export const Groups = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getGroups = async () => {
      try {
        const grp = await axios.get(`/api/v1/group/groups`);
        setGroups(grp.data);
        console.log(grp.data);
      } catch (error) {
        console.log(error);
      }
    };
    getGroups();
  }, []);

  const handleGroupClick = (groupid) => {
    // Navigate to the Groupinfo page with the selected group ID as a URL parameter
    navigate(`/group/${groupid}`);
  };
  return (
    <div>
      <h1>Your Groups</h1>
      <ul>
        {groups?.map((group) => (
          <li key={group._id} onClick={() => handleGroupClick(group._id)}>
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
