import { render, screen } from "@testing-library/react";
import Main from "./main";

describe("Main", () => {
  let user;

  beforeEach(() => {
    window.HTMLMediaElement.prototype.load = () => undefined;
    window.HTMLMediaElement.prototype.play = () => undefined;
    window.HTMLMediaElement.prototype.pause = () => undefined;
    user = {
      username: "Person",
    };
  });

  it("contains the header when no user is logged in", () => {
    render(<Main />);
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Welcome to Pac-Man!"
    );
  });

  it("contains the header when a user is logged in", () => {
    render(<Main user={user} />);
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Welcome back Person!"
    );
  });

  it("contains the log in button when no user is logged in", () => {
    render(<Main />);
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
  });

  it("contains the sign up button when no user is logged in", () => {
    render(<Main />);
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });

  it("contains the log out button when a user is logged in", () => {
    render(<Main user={user} />);
    expect(screen.getByRole("button", { name: "Log out" })).toBeInTheDocument();
  });

  it("contains the gif", () => {
    render(<Main />);
    const gifEl = screen.getByRole("img");
    expect(gifEl).toHaveAttribute(
      "src",
      "https://media4.giphy.com/media/42rO49pxzaMnK/giphy.gif?cid=790b76116dc1bedf27887938cbe8df55b210b12f842af0e9&rid=giphy.gif&ct=g"
    );
    expect(gifEl).toHaveAttribute("alt", "Pac-Man gif");
  });

  it("informs the player they can make an account when no user is logged in", () => {
    render(<Main />);
    const signupInstructions =
      "Make an account to submit your score onto the leaderboard!";
    expect(screen.getByText(signupInstructions)).toBeInTheDocument();
  });

  it("contains the play button", () => {
    render(<Main />);
    expect(screen.getByRole("button", { name: "Play" })).toBeInTheDocument();
  });

  it("contains the instructions text", () => {
    render(<Main />);
    const instructionsEl =
      "Use the directional keys to move Pac-Man around the board while avoiding the ghosts as best you can. " +
      "Pick up a power up and then attack the ghosts! " +
      "Eat all the pellets on the board to level up. " +
      "Press esc to pause and unpause the game at any time. " +
      "(For mobile and tablet users, a D-pad will appear below the board for you to move Pac-Man around)";

    expect(screen.getByText(instructionsEl)).toBeInTheDocument();
  });
});
