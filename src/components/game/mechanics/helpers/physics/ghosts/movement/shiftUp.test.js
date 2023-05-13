import shiftUp from "./shiftUp";

describe("shiftUp", () => {
  it("takes 2 away from position.y when position.y % 8 equals 2", () => {
    const mockGhost = {
      position: {
        y: 82,
      },
    };
    shiftUp(mockGhost);
    expect(mockGhost.position.y).toBe(80);
  });

  it("takes 4 away from position.y when position.y % 8 equals 4", () => {
    const mockGhost = {
      position: {
        y: 84,
      },
    };
    shiftUp(mockGhost);
    expect(mockGhost.position.y).toBe(80);
  });

  it("takes 6 away from position.y when position.y % 8 equals 6", () => {
    const mockGhost = {
      position: {
        y: 86,
      },
    };
    shiftUp(mockGhost);
    expect(mockGhost.position.y).toBe(80);
  });
});
