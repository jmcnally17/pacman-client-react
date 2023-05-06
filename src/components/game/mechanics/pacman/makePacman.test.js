import PacMan from "../../models/pacman";
import makePacman from "./makePacman";

jest.mock("../../models/pacman");

describe("makePacman", () => {
  it("returns a Pac-Man object", () => {
    const mockVariables = {
      tileLength: 32,
    };
    expect(makePacman(mockVariables)).toBeInstanceOf(PacMan);
  });
});
