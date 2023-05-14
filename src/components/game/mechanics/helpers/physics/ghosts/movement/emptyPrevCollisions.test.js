import GhostMovement from "./ghostMovement";

describe("emptyPrevCollisions", () => {
  it("empties the prevCollisions array on the ghost", () => {
    const ghost = { prevCollisions: ["up", "down"] };
    GhostMovement.emptyPrevCollisions(ghost);
    expect(ghost.prevCollisions).toEqual([]);
  });
});
