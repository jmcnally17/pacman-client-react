import BoundaryManager from "./boundaryManager";

describe("hitBoundaryConditional", () => {
  it("returns true for a character colliding with a boundary", () => {
    const character = { position: { x: 200, y: 200 }, radius: 40 };
    const boundary = { position: { x: 200, y: 200 }, height: 50, width: 50 };
    const mockVelocity = { velocity: { x: 0, y: 0 } };
    expect(
      BoundaryManager.hitBoundaryConditional(character, boundary, mockVelocity)
    ).toBeTruthy();
  });

  it("returns false for a character that isn't colliding with a boundary", () => {
    const character = { position: { x: 350, y: 40 }, radius: 10 };
    const boundary = { position: { x: 200, y: 200 }, height: 10, width: 10 };
    const mockVelocity = { velocity: { x: 5, y: 0 } };
    expect(
      BoundaryManager.hitBoundaryConditional(character, boundary, mockVelocity)
    ).toBeFalsy();
  });
});
