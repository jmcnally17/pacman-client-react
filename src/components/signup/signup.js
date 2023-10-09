import React, { useState } from "react";
import axios from "axios";
import "./signup.css";
import { Profanity, ProfanityOptions } from "@2toad/profanity";

const usersUrl = process.env.REACT_APP_BACKEND_URL
  ? `${process.env.REACT_APP_BACKEND_URL}/users`
  : "http://localhost:8080/users";

const authUrl = process.env.REACT_APP_BACKEND_URL
  ? `${process.env.REACT_APP_BACKEND_URL}/auth`
  : "http://localhost:8080/auth";

const redirectUrl = process.env.REACT_APP_URL
  ? process.env.REACT_APP_URL
  : "http://localhost:8000";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const options = new ProfanityOptions();
  options.wholeWord = false;
  const profanity = new Profanity(options);

  const handleUsername = ({ target }) => {
    setUsername(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleEnter = (event) => {
    const buttonEl = document.querySelector("#signup-button");
    if (event.key === "Enter") buttonEl.click();
  };

  const handleSubmit = () => {
    let nameError = document.getElementById("error-message");
    if (username.includes(" ")) {
      nameError.innerText = "Username cannot contain any spaces";
    } else if (username.length < 3 || username.length > 15) {
      nameError.innerText = "Username must be 3-15 characters long";
    } else if (profanity.exists(username)) {
      nameError.innerText = "No profanity!";
    } else if (password.length < 8) {
      nameError.innerText = "Password must be at least 8 characters long";
    } else {
      axios
        .post(usersUrl, {
          username: username,
          password: password,
        })
        .then((res) => {
          if (res.status === 201) {
            login();
          } else {
            throw res;
          }
        })
        .catch((err) => setError(err.response.data.message));
    }
  };

  const login = () => {
    axios
      .post(authUrl, {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data);
          window.location.href = redirectUrl;
        } else {
          throw res;
        }
      })
      .catch((err) => setError(err.response.data.message));
  };

  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <div className="border">
        <input
          placeholder="Username"
          onChange={handleUsername}
          onKeyDown={handleEnter}
        ></input>
        <br></br>
        <input
          type="password"
          placeholder="Password"
          onChange={handlePassword}
          onKeyDown={handleEnter}
        ></input>
        <br></br>
        <button id="signup-button" onClick={handleSubmit}>
          Sign up
        </button>
        <p className="error-message" id="error-message">
          {error}
        </p>
      </div>
    </div>
  );
}
