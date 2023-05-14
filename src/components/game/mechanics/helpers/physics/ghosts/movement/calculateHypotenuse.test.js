import GhostMovement from "./ghostMovement";

describe("calculateHypotenuse", () => {
  it("calculates the hypotenuse of a vector and adds it to the pathway object", () => {
    const mockVector = { x: 4, y: 3 };
    const pathway = {};
    GhostMovement.calculateHypotenuse(mockVector, pathway);
    expect(pathway.distance).toBe(5);
  });
});
