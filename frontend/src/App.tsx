import "./App.css";
import React, { useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Faqs from "./Pages/Faqs";
import Repositories from "./Pages/Repositories";
import GithubLogin from "./Pages/GithubLogin";
import { Layout } from "./Pages/Layout";
import { AuthContext } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { User } from "./hooks/useUser";

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <div className="App">
      <AuthContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Login />} />
              <Route path="/login/github/callback" element={<GithubLogin />} />
              <Route path="/faqs" element={<Faqs />} />
              <Route
                path="/repo"
                element={
                    <Repositories />
                }
              />
              <Route
                path="/profile"
                element={
                    <Profile />
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
