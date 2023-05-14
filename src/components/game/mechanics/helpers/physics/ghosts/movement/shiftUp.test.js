import GhostMovement from "./ghostMovement";

describe("shiftUp", () => {
  it("takes 2 away from position.y when position.y % 8 equals 2", () => {
    const ghost = { position: { y: 82 } };
    GhostMovement.shiftUp(ghost);
    expect(ghost.position.y).toBe(80);
  });

  it("takes 4 away from position.y when position.y % 8 equals 4", () => {
    const ghost = { position: { y: 84 } };
    GhostMovement.shiftUp(ghost);
    expect(ghost.position.y).toBe(80);
  });

  it("takes 6 away from position.y when position.y % 8 equals 6", () => {
    const ghost = { position: { y: 86 } };
    GhostMovement.shiftUp(ghost);
    expect(ghost.position.y).toBe(80);
  });
});
