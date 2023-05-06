import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./main.css";
import Game from "../game/game";
import { Howl } from "howler";

const logoutUrl = process.env.REACT_APP_BACKEND_URL
  ? `${process.env.REACT_APP_BACKEND_URL}/sessions`
  : "http://localhost:9000/sessions";

export default function Main({ reactRoot, user }) {
  const [theme] = useState(
    new Howl({
      src: ["./audio/title_theme.wav"],
      loop: true,
      volume: 0.3,
    })
  );

  useEffect(() => {
    theme.play();
    window.addEventListener("keydown", (event) => {
      if (["ArrowUp", "ArrowDown"].includes(event.code)) {
        event.preventDefault();
      }
    });
  }, [theme]);

  const handleLogout = () => {
    axios.delete(logoutUrl, {
      withCredentials: true,
    });
    window.location.reload();
  };

  const handleSubmit = () => {
    const player = user ? user : undefined;
    theme.pause();
    if (reactRoot) {
      reactRoot.render(<Game player={player} reactRoot={reactRoot} />);
    } else {
      const root = ReactDOM.createRoot(document.getElementById("subRoot"));
      root.render(<Game player={player} reactRoot={root} />);
    }
  };

  const header = () => {
    return user ? (
      <h1>Welcome back {user.username}!</h1>
    ) : (
      <h1>Welcome to Pac-Man!</h1>
    );
  };

  const buttons = () => {
    return user ? (
      <button className="logout-button" onClick={handleLogout}>
        Log out
      </button>
    ) : (
      <div>
        <a href="/login">
          <button className="login-button">Log in</button>
        </a>
        <a href="/signup">
          <button className="signup-button">Sign up</button>
        </a>
      </div>
    );
  };

  const signupInstructions = () => {
    return user ? null : (
      <p className="signup-instructions">
        Make an account to submit your score onto the leaderboard!
      </p>
    );
  };

  return (
    <div className="main" id="main">
      {header()}
      {buttons()}
      <br></br>
      <br></br>
      <img
        className="title-gif"
        src="https://media4.giphy.com/media/42rO49pxzaMnK/giphy.gif?cid=790b76116dc1bedf27887938cbe8df55b210b12f842af0e9&rid=giphy.gif&ct=g"
        alt="Pac-Man gif"
      />
      {signupInstructions()}
      <div className="register">
        <button className="play-button" id="play-button" onClick={handleSubmit}>
          Play
        </button>
      </div>
      <p className="name-error" id="name-error"></p>
      <p className="instructions">
        Use the directional keys to move Pac-Man around the board while avoiding
        the ghosts as best you can. Pick up a power up and then attack the
        ghosts! Eat all the pellets on the board to level up. Press esc to pause
        and unpause the game at any time. (For mobile and tablet users, a D-pad
        will appear below the board for you to move Pac-Man around)
      </p>
    </div>
  );
}
