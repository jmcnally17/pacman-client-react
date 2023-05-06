import shiftDown from "./shiftDown";

describe("shiftDown", () => {
  it("adds 6 to position.y when position.y % 8 equals 2", () => {
    const mockGhost = {
      position: {
        y: 82,
      },
    };
    shiftDown(mockGhost);
    expect(mockGhost.position.y).toBe(88);
  });

  it("adds 4 to position.y when position.y % 8 equals 4", () => {
    const mockGhost = {
      position: {
        y: 84,
      },
    };
    shiftDown(mockGhost);
    expect(mockGhost.position.y).toBe(88);
  });

  it("adds 2 to position.y when position.y % 8 equals 6", () => {
    const mockGhost = {
      position: {
        y: 86,
      },
    };
    shiftDown(mockGhost);
    expect(mockGhost.position.y).toBe(88);
  });
});
