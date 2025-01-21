/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { styles } from "../constants/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants";
import { getUsers } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const headers = [
  {
    id: "username",
    name: "Username",
  },
  {
    id: "email",
    name: "Email",
  },
  {
    id: "isKYCVerified",
    name: "Verified",
  },
  {
    id: "isProfileComplete",
    name: "Profile",
  },
  {
    id: "actions",
    name: "Actions",
  },
];

const Users = ({ setActive }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, usersError } = useSelector((state) => state.users);
  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) {
      dispatch(getUsers());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    setActive("users");
  }, [setActive]);

  const handleAction = (action, userId) => {
    console.log(`Action: ${action}, User ID: ${userId}`);
    if (action === "edit") {
      navigate(`/userprofile/${userId}`);
    }
  };

  const modifiedUsers =
    users &&
    users.map((user) => ({
      ...user,
      actions: (
        <select
          onChange={(e) => handleAction(e.target.value, user._id)}
          className="p-2 border rounded"
        >
          <option value="">Select action</option>
          <option value="edit">Edit</option>
          <option value="delete">Delete</option>
        </select>
      ),
      isKYCVerified: user.isKYCVerified ? "Verified" : "Not Verified",
      isProfileComplete: user.isProfileComplete ? "complete" : "incomplete",
    }));

  if (usersError) {
    return <p className="p-6">Failed to load users. Try again </p>;
  }

  return (
    <section className={`${styles.authWrapper} p-6`}>
      <div className="flex flex-col gap-6">
        <h3 className={styles.title}>Users</h3>
        <Datatable headers={headers} data={modifiedUsers} rowKey="_id" />
      </div>
    </section>
  );
};

export default Users;
