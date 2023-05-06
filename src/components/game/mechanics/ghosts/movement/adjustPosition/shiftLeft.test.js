import shiftLeft from "./shiftLeft";

describe("shiftLeft", () => {
  it("takes 2 away from position.x when position.x % 8 equals 2", () => {
    const mockGhost = {
      position: {
        x: 82,
      },
    };
    shiftLeft(mockGhost);
    expect(mockGhost.position.x).toBe(80);
  });

  it("takes 4 away from position.x when position.x % 8 equals 4", () => {
    const mockGhost = {
      position: {
        x: 84,
      },
    };
    shiftLeft(mockGhost);
    expect(mockGhost.position.x).toBe(80);
  });

  it("takes 6 away from position.x when position.x % 8 equals 6", () => {
    const mockGhost = {
      position: {
        x: 86,
      },
    };
    shiftLeft(mockGhost);
    expect(mockGhost.position.x).toBe(80);
  });
});
