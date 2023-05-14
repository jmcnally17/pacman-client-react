import GhostMovement from "./ghostMovement";

describe("shiftDown", () => {
  it("adds 6 to position.y when position.y % 8 equals 2", () => {
    const ghost = { position: { y: 82 } };
    GhostMovement.shiftDown(ghost);
    expect(ghost.position.y).toBe(88);
  });

  it("adds 4 to position.y when position.y % 8 equals 4", () => {
    const ghost = { position: { y: 84 } };
    GhostMovement.shiftDown(ghost);
    expect(ghost.position.y).toBe(88);
  });

  it("adds 2 to position.y when position.y % 8 equals 6", () => {
    const ghost = { position: { y: 86 } };
    GhostMovement.shiftDown(ghost);
    expect(ghost.position.y).toBe(88);
  });
});
