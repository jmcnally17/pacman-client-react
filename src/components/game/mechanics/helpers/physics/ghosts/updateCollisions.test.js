import GhostManager from "./ghostManager";
import BoundaryManager from "../boundaries/boundaryManager";

jest.mock("../boundaries/boundaryManager");

describe("updateCollisions", () => {
  let boundary;
  let boundaries;

  beforeEach(() => {
    BoundaryManager.mockClear();
    boundary = "boundary";
    boundaries = [boundary];
  });

  it("adds down to the collisions array", () => {
    const collisions = [];
    const ghost = { speed: 8, prevCollisions: ["down"] };
    BoundaryManager.hitBoundaryConditional.mockReturnValueOnce(true);
    GhostManager.updateCollisions(boundaries, collisions, ghost);
    expect(BoundaryManager.hitBoundaryConditional).toHaveBeenCalledTimes(1);
    expect(BoundaryManager.hitBoundaryConditional).toHaveBeenCalledWith(
      ghost,
      boundary,
      { velocity: { x: 0, y: 8 } }
    );
    expect(collisions).toEqual(["down"]);
  });

  it("adds right to the collisions array", () => {
    const collisions = ["down"];
    const ghost = { speed: 8, prevCollisions: ["down", "right"] };
    BoundaryManager.hitBoundaryConditional.mockReturnValueOnce(true);
    GhostManager.updateCollisions(boundaries, collisions, ghost);
    expect(BoundaryManager.hitBoundaryConditional).toHaveBeenCalledTimes(1);
    expect(BoundaryManager.hitBoundaryConditional).toHaveBeenCalledWith(
      ghost,
      boundary,
      { velocity: { x: 8, y: 0 } }
    );
    expect(collisions).toEqual(["down", "right"]);
  });

  it("adds left to the collisions array", () => {
    const collisions = ["down", "right"];
    const ghost = { speed: 8, prevCollisions: ["down", "right", "left"] };
    BoundaryManager.hitBoundaryConditional.mockReturnValueOnce(true);
    GhostManager.updateCollisions(boundaries, collisions, ghost);
    expect(BoundaryManager.hitBoundaryConditional).toHaveBeenCalledTimes(1);
    expect(BoundaryManager.hitBoundaryConditional).toHaveBeenCalledWith(
      ghost,
      boundary,
      { velocity: { x: -8, y: 0 } }
    );
    expect(collisions).toEqual(["down", "right", "left"]);
  });

  it("adds up to the collisions array", () => {
    const collisions = ["down", "right", "left"];
    const ghost = { speed: 8, prevCollisions: ["down", "right", "left", "up"] };
    BoundaryManager.hitBoundaryConditional.mockReturnValueOnce(true);
    GhostManager.updateCollisions(boundaries, collisions, ghost);
    expect(BoundaryManager.hitBoundaryConditional).toHaveBeenCalledTimes(1);
    expect(BoundaryManager.hitBoundaryConditional).toHaveBeenCalledWith(
      ghost,
      boundary,
      { velocity: { x: 0, y: -8 } }
    );
    expect(collisions).toEqual(["down", "right", "left", "up"]);
  });

  it("does not add any directions if the boundary conditional is false", () => {
    const collisions = [];
    const ghost = { prevCollisions: ["down", "right", "left", "up"] };
    BoundaryManager.hitBoundaryConditional.mockReturnValueOnce(false);
    GhostManager.updateCollisions(boundaries, collisions, ghost);
    expect(collisions).toEqual([]);
  });

  it("updates the prevCollisions array if it is shorter than the resultant collisions array", () => {
    const collisions = ["down", "right", "left"];
    const ghost = { prevCollisions: ["down"] };
    BoundaryManager.hitBoundaryConditional.mockReturnValueOnce(true);
    GhostManager.updateCollisions(boundaries, collisions, ghost);
    expect(collisions).toEqual(["down", "right", "left", "up"]);
    expect(ghost.prevCollisions).toEqual(["down", "right", "left", "up"]);
  });
});
