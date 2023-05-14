import GhostMovement from "./ghostMovement";

describe("shiftRight", () => {
  it("adds 6 to position.x when position.x % 8 equals 2", () => {
    const ghost = { position: { x: 82 } };
    GhostMovement.shiftRight(ghost);
    expect(ghost.position.x).toBe(88);
  });

  it("adds 4 to position.x when position.x % 8 equals 4", () => {
    const ghost = { position: { x: 84 } };
    GhostMovement.shiftRight(ghost);
    expect(ghost.position.x).toBe(88);
  });

  it("adds 2 to position.x when position.x % 8 equals 6", () => {
    const ghost = { position: { x: 86 } };
    GhostMovement.shiftRight(ghost);
    expect(ghost.position.x).toBe(88);
  });
});
