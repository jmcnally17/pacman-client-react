import makeGhosts from "./makeGhosts";
import Ghost from "../../models/ghost";

jest.mock("../../models/ghost");

describe("makeGhosts", () => {
  it("returns an array containing the four ghosts", () => {
    const mockVariables = {
      tileLength: 32,
    };
    const ghosts = makeGhosts(mockVariables);
    expect(ghosts.length).toBe(4);
    ghosts.forEach((ghost) => expect(ghost).toBeInstanceOf(Ghost));
  });
});
