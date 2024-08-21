import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Groupinfo = () => {
  const [groupinfo, setGroupinfo] = useState(null);
  const { groupid } = useParams(); // Get group ID from the URL

  useEffect(() => {
    const getGroupinfo = async () => {
      try {
        const res = await axios.get(`/api/v1/group/${groupid}`);
        console.log(res.data);
        setGroupinfo(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (groupid) {
      getGroupinfo();
    }
  }, [groupid]);

  if (!groupinfo) {
    // Render loading or empty state if groupinfo is null
    return <div>Loading group info...</div>;
  }

  return (
    <div>
      <h1>Groupinfo</h1>
      <ul>
        <li>
          Users:
          <ul>
            {groupinfo.users.map((user) => (
              <li key={user._id}>{user.name}</li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};
