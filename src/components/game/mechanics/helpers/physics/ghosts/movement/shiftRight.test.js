import shiftRight from "./shiftRight";

describe("shiftRight", () => {
  it("adds 6 to position.x when position.x % 8 equals 2", () => {
    const mockGhost = {
      position: {
        x: 82,
      },
    };
    shiftRight(mockGhost);
    expect(mockGhost.position.x).toBe(88);
  });

  it("adds 4 to position.x when position.x % 8 equals 4", () => {
    const mockGhost = {
      position: {
        x: 84,
      },
    };
    shiftRight(mockGhost);
    expect(mockGhost.position.x).toBe(88);
  });

  it("adds 2 to position.x when position.x % 8 equals 6", () => {
    const mockGhost = {
      position: {
        x: 86,
      },
    };
    shiftRight(mockGhost);
    expect(mockGhost.position.x).toBe(88);
  });
});
