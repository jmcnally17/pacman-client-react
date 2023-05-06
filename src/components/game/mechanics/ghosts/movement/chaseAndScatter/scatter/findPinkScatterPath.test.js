import findPinkScatterPath from "./findPinkScatterPath";

describe("findPinkScatterPath", () => {
  it("returns a vector from the pathways position to the pink ghosts scatter corner", () => {
    const mockPathway = {
      position: {
        x: 450,
        y: 290,
      },
    };
    expect(findPinkScatterPath(mockPathway)).toEqual({
      x: -450,
      y: -290,
    });
  });
});
