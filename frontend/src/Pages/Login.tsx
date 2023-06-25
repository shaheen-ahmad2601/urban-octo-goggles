import React from "react";
import { useAuth } from "../hooks/useAuth";
import config from "../.config"
import { Navigate } from "react-router-dom";

type Props = {};

export default function Login({}: Props) {
  const clientId = config.REACT_APP_GITHUB_CLIENT_ID;
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,read:user,read:email`

  const {user} = useAuth()

  if(user) {
    return <Navigate to="/profile" />
  }

  return (
    <>
      <div>
      <a  className="home-container" href={redirectUrl}>Login with Github</a>
      </div>
    </>
  );
}
