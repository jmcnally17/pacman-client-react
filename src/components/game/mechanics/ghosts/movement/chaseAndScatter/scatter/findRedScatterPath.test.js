import findRedScatterPath from "./findRedScatterPath";

describe("findRedScatterPath", () => {
  it("returns a vector from the pathways position to the red ghosts scatter corner", () => {
    const mockPathway = {
      position: {
        x: 450,
        y: 290,
      },
    };
    expect(findRedScatterPath(mockPathway)).toEqual({
      x: 446,
      y: -290,
    });
  });
});
