import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import "./styles/style.css";
type Props = {};

export default function Profile({}: Props) {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="profile-container">
      <p>User Profile</p>
      <img src={user?.image} alt="" />
      <span>
        <p>{user?.name}</p>
        <p>{user?.username}</p>
      </span>
      <button onClick={logout}>logout</button>
    </div>
  );
}
