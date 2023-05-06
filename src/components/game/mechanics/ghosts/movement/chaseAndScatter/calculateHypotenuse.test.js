import calculateHypotenuse from "./calculateHypotenuse";

describe("calculateHypotenuse", () => {
  it("calculates the hypotenuse of a vector and adds it to the pathway object", () => {
    const mockVector = {
      x: 4,
      y: 3,
    };
    const mockPathway = {};
    calculateHypotenuse(mockVector, mockPathway);
    expect(mockPathway.distance).toBe(5);
  });
});
