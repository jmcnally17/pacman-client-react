import Factory from "./factory";
import Ghost from "../../models/ghost";

jest.mock("../../models/ghost");

describe("makeGhosts", () => {
  it("returns an array containing the four ghosts", () => {
    const mockVariables = {
      tileLength: 32,
    };
    const ghosts = Factory.makeGhosts(mockVariables);
    expect(Object.entries(ghosts).length).toBe(4);
    expect(ghosts.red).toBeInstanceOf(Ghost);
    expect(ghosts.pink).toBeInstanceOf(Ghost);
    expect(ghosts.cyan).toBeInstanceOf(Ghost);
    expect(ghosts.orange).toBeInstanceOf(Ghost);
  });
});
