import { render, screen } from "@testing-library/react";
import Footer from "./footer";

describe("Footer", () => {
  it("contains the footer text", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer-text")).toHaveTextContent(
      "This project was created by Joe McNally and stored on GitHub. " +
        "A big thank you to Namco for creating Pac-Man in 1980."
    );
  });

  it("contains the link to the GitHub profile", () => {
    render(<Footer />);
    const profileLinkEl = screen.getByRole("link", { name: "Joe McNally" });
    expect(profileLinkEl).toHaveAttribute(
      "href",
      "https://github.com/jmcnally17"
    );
    expect(profileLinkEl).toHaveTextContent("Joe McNally");
  });

  it("contains the link to the GitHub repo", () => {
    render(<Footer />);
    const githubRepoEl = screen.getByRole("link", { name: "GitHub" });
    expect(githubRepoEl).toHaveAttribute(
      "href",
      "https://github.com/jmcnally17/pacman-client-react"
    );
    expect(githubRepoEl).toHaveTextContent("GitHub");
  });
});
