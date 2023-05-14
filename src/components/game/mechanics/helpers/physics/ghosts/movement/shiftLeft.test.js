import GhostMovement from "./ghostMovement";

describe("shiftLeft", () => {
  it("takes 2 away from position.x when position.x % 8 equals 2", () => {
    const ghost = { position: { x: 82 } };
    GhostMovement.shiftLeft(ghost);
    expect(ghost.position.x).toBe(80);
  });

  it("takes 4 away from position.x when position.x % 8 equals 4", () => {
    const ghost = { position: { x: 84 } };
    GhostMovement.shiftLeft(ghost);
    expect(ghost.position.x).toBe(80);
  });

  it("takes 6 away from position.x when position.x % 8 equals 6", () => {
    const ghost = { position: { x: 86 } };
    GhostMovement.shiftLeft(ghost);
    expect(ghost.position.x).toBe(80);
  });
});
