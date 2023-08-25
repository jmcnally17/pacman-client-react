import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Main from "./components/main/main";
import Signup from "./components/signup/signup";
import Footer from "./components/footer/footer";
import Login from "./components/login/login";

const sessionsUrl = process.env.REACT_APP_BACKEND_URL
  ? `${process.env.REACT_APP_BACKEND_URL}/sessions`
  : "http://localhost:9000/sessions";

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get(sessionsUrl, {
        withCredentials: true,
        headers: {
          authorisation: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data.user);
      });
  }, []);

  return (
    <div className="App">
      <div id="subRoot">
        <Routes>
          <Route path="/" element={<Main user={user} />}></Route>
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          ></Route>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          ></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
