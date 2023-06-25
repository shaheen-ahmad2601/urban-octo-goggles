import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import config from "../.config";
import "./styles/style.css";

type Props = {};

export default function GithubLogin({}: Props) {
  const navigate = useNavigate();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) return;

    async function getUserData(bearer: string) {
      await fetch(`${config.REACT_APP_BACKEND_URL}/getUserData`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + bearer,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data: any) => {
          login({
            image: data.avatar_url,
            name: data.name,
            username: data.login,
            authToken: bearer,
          });
          // redirect to profile page.
          navigate("/profile");
        });
    }

    async function getAccessToken() {
      await fetch(
        config.REACT_APP_BACKEND_URL + "/getAccessToken?code=" + codeParam,
        {
          method: "GET",
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.access_token) {
            getUserData(data.access_token);
          }
        });
    }
    getAccessToken();
  }, []);

  return (
    <div>
      {user ? (
        <p className="header-text">You have already logged in!</p>
      ) : (
        <p className="header-text">
          Please wait. Logging into your Github Account..
        </p>
      )}
    </div>
  );
}
