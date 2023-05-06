import hitBoundaryConditional from "./hitBoundaryConditional";

describe("hitBoundaryConditional", () => {
  it("returns true for a character colliding with a boundary", () => {
    const mockCharacter = {
      position: {
        x: 200,
        y: 200,
      },
      radius: 40,
    };
    const mockBoundary = {
      position: {
        x: 200,
        y: 200,
      },
      height: 50,
      width: 50,
    };
    const mockVelocity = {
      velocity: {
        x: 0,
        y: 0,
      },
    };
    expect(
      hitBoundaryConditional(mockCharacter, mockBoundary, mockVelocity)
    ).toBeTruthy();
  });

  it("returns false for a character that isn't colliding with a boundary", () => {
    const mockCharacter = {
      position: {
        x: 350,
        y: 40,
      },
      radius: 10,
    };
    const mockBoundary = {
      position: {
        x: 200,
        y: 200,
      },
      height: 10,
      width: 10,
    };
    const mockVelocity = {
      velocity: {
        x: 5,
        y: 0,
      },
    };
    expect(
      hitBoundaryConditional(mockCharacter, mockBoundary, mockVelocity)
    ).toBeFalsy();
  });
});
