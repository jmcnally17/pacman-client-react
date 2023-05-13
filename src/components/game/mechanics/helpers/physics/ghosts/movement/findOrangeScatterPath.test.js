import findOrangeScatterPath from "./chaseAndScatter/scatter/findOrangeScatterPath";

describe("findOrangeScatterPath", () => {
  it("returns a vector from the pathway to the orange ghosts scatter corner", () => {
    const mockPathway = {
      position: {
        x: 280,
        y: 420,
      },
    };
    expect(findOrangeScatterPath(mockPathway)).toEqual({
      x: -280,
      y: 572,
    });
  });
});
