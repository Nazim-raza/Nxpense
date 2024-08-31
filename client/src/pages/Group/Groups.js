import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auths";

export const Groups = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  const [auth] = useAuth();

  useEffect(() => {
    const getGroups = async () => {
      try {
        const config = {
          headers: {
            Authorization: `${auth.token}`,
          },
        };
        const grp = await axios.get(`/api/v1/group/groups`, config);
        console.log(grp.data);
        setGroups(grp.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (auth?.token) getGroups();
  }, [auth?.token]);

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
