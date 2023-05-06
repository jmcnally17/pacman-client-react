import findCyanScatterPath from "./findCyanScatterPath";

describe("findCyanScatterPath", () => {
  it("returns a vector from the pathways position to the cyan ghosts scatter corner", () => {
    const mockPathway = {
      position: {
        x: 450,
        y: 290,
      },
    };
    expect(findCyanScatterPath(mockPathway)).toEqual({
      x: 446,
      y: 702,
    });
  });
});
