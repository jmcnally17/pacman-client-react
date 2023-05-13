import Factory from "./factory";
import PacMan from "../../models/pacman";

jest.mock("../../models/pacman");

describe("makePacman", () => {
  it("returns a Pac-Man object", () => {
    const mockVariables = {
      tileLength: 32,
    };
    expect(Factory.makePacman(mockVariables)).toBeInstanceOf(PacMan);
  });
});
