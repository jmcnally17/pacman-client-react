import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./login";

describe("Login", () => {
  it("contains the header", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading")).toHaveTextContent("Log In");
  });

  it("contains the username and password input fields", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(
      screen.getByRole("textbox", { placeholder: "Username" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { placeholder: "Password" })
    ).toBeInTheDocument();
  });

  it("contains the button to log in", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByRole("button")).toHaveTextContent("Log in");
  });
});
