import { render, screen, within } from "@testing-library/react";
import mockAxios from "jest-mock-axios";
import Leaderboard from "./leaderboard";

describe("Leaderboard", () => {
  let mockVariables;
  let mockScores;

  beforeEach(() => {
    mockVariables = {
      score: 2000,
    };
    mockScores = [
      { username: "Molly", points: 11390 },
      { username: "Bob", points: 9830 },
      { username: "Andrew", points: 4620 },
    ];
  });

  afterAll(() => {
    mockAxios.reset();
  });

  it("contains the headings for Game over and the number of points scored", async () => {
    render(<Leaderboard variables={mockVariables} />);
    expect(await screen.findByRole("heading", { level: 1 })).toHaveTextContent(
      "Game Over"
    );
    expect(await screen.findByRole("heading", { level: 4 })).toHaveTextContent(
      "You scored 2000 points"
    );
  });

  it("contains the leaderboard table", async () => {
    render(<Leaderboard variables={mockVariables} />);
    expect(await screen.findByRole("table")).toHaveAttribute("class", "list");
  });

  it("prints a message telling the user to wait a moment before the table data has been fetched", async () => {
    render(<Leaderboard variables={mockVariables} />);
    const tableEl = await screen.findByRole("table");
    expect(within(tableEl).getByTestId("wait-message")).toHaveTextContent(
      "Please wait a moment..."
    );
  });

  it("contains the table headings after the data has been fetched", async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: {
        scores: mockScores,
      },
    });
    render(<Leaderboard variables={mockVariables} />);
    expect(
      await screen.findByRole("columnheader", { name: "Rank" })
    ).toHaveTextContent("Rank");
    expect(
      await screen.findByRole("columnheader", { name: "Name" })
    ).toHaveTextContent("Name");
    expect(
      await screen.findByRole("columnheader", { name: "Score" })
    ).toHaveTextContent("Score");
  });

  it("fetches the scores from the database and displays them in the table", async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: {
        scores: mockScores,
      },
    });
    render(<Leaderboard variables={mockVariables} />);

    const entryOneEl = await screen.findByRole("row", { name: 0 });
    expect(
      within(entryOneEl).getByRole("cell", { name: 1 })
    ).toBeInTheDocument();
    expect(
      within(entryOneEl).getByRole("cell", { name: "Molly" })
    ).toBeInTheDocument();
    expect(
      within(entryOneEl).getByRole("cell", { name: 11390 })
    ).toBeInTheDocument();

    const entryTwoEl = await screen.findByRole("row", { name: 1 });
    expect(
      within(entryTwoEl).getByRole("cell", { name: 2 })
    ).toBeInTheDocument();
    expect(
      within(entryTwoEl).getByRole("cell", { name: "Bob" })
    ).toBeInTheDocument();
    expect(
      within(entryTwoEl).getByRole("cell", { name: 9830 })
    ).toBeInTheDocument();

    const entryThreeEl = await screen.findByRole("row", { name: 2 });
    expect(
      within(entryThreeEl).getByRole("cell", { name: 3 })
    ).toBeInTheDocument();
    expect(
      within(entryThreeEl).getByRole("cell", { name: "Andrew" })
    ).toBeInTheDocument();
    expect(
      within(entryThreeEl).getByRole("cell", { name: 4620 })
    ).toBeInTheDocument();
  });

  it("displays an error on the page when the fetch fails", async () => {
    mockAxios.get.mockRejectedValueOnce();
    render(<Leaderboard variables={mockVariables} />);
    expect(await screen.findByTestId("error")).toHaveTextContent(
      "Oops, something went wrong!"
    );
    expect(screen.queryByRole("table")).toBeNull();
  });

  it("contains the buttons to play again and go home", async () => {
    render(<Leaderboard variables={mockVariables} />);
    expect(
      await screen.findByRole("button", { name: "Play Again" })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", {
        name: "Home",
      })
    ).toBeInTheDocument();
  });
});
