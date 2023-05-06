import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Signup from "./signup";

describe("Signup", () => {
  it("contains the header", () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading")).toHaveTextContent("Sign Up");
  });

  it("contains the username and password input fields", () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    expect(
      screen.getByRole("textbox", { placeholder: "Username" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { placeholder: "Password" })
    ).toBeInTheDocument();
  });

  it("contains the button to register", () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    expect(screen.getByRole("button")).toHaveTextContent("Sign up");
  });
});
