import makePellets from "./makePellets";
import Pellet from "../../models/pellet";

jest.mock("../../models/pellet");

let mockVariables;

describe("makePellets", () => {
  beforeEach(() => {
    Pellet.mockClear();
    mockVariables = {
      tileLength: 32,
    };
  });

  it("returns an array of the four tunnel boundaries for an empty map", () => {
    expect(makePellets([[]], mockVariables).length).toBe(0);
  });

  it("returns an array of appropriate boundary objects for each type of boundary as well as the tunnel boundaries", () => {
    const pellets = makePellets(
      [
        ["-", "|"],
        [".", "2", ".", "4"],
        [".", " "],
      ],
      mockVariables
    );
    expect(pellets.length).toBe(3);
    pellets.forEach((pellet) => expect(pellet).toBeInstanceOf(Pellet));
  });
});
