import Factory from "./factory";
import Ghost from "../../models/ghost";

jest.mock("../../models/ghost");

describe("makeGhosts", () => {
  const mockVariables = { tileLength: 32 };

  it("returns an array containing the four ghosts", () => {
    const ghosts = Factory.makeGhosts(mockVariables);
    expect(Object.entries(ghosts).length).toBe(4);
    expect(ghosts.red).toBeInstanceOf(Ghost);
    expect(ghosts.pink).toBeInstanceOf(Ghost);
    expect(ghosts.cyan).toBeInstanceOf(Ghost);
    expect(ghosts.orange).toBeInstanceOf(Ghost);
  });

  it("assigns the initial sprites", () => {
    const ghosts = Factory.makeGhosts(mockVariables);
    expect(ghosts.red.assignSprite).toHaveBeenCalledTimes(1);
    expect(ghosts.pink.assignSprite).toHaveBeenCalledTimes(1);
    expect(ghosts.cyan.assignSprite).toHaveBeenCalledTimes(1);
    expect(ghosts.orange.assignSprite).toHaveBeenCalledTimes(1);
  });
});
