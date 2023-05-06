import shiftRegular from "./shiftRegular";

describe("shiftRegular", () => {
  it("adds 2 to both position.x and position.y if they are not divisible by 4", () => {
    const mockGhost = {
      position: {
        x: 82,
        y: 194,
      },
    };
    shiftRegular(mockGhost);
    expect(mockGhost.position).toEqual({
      x: 84,
      y: 196,
    });
  });
});
