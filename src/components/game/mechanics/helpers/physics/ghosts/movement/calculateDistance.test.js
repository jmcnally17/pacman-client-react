import GhostMovement from "./ghostMovement";

describe("calculateDistance", () => {
  let assets;
  let ghost;
  let pathwayOne;
  let pathwayTwo;
  let pathways;
  let variables;
  let addCoordinates;
  let chase;
  let scatter;
  let calculateHypotenuse;

  beforeEach(() => {
    assets = "assets";
    ghost = "ghost";
    pathwayOne = "pathwayOne";
    pathwayTwo = "pathwayTwo";
    pathways = [pathwayOne, pathwayTwo];
    variables = "variables";
    addCoordinates = jest.fn();
    chase = jest.fn();
    scatter = jest.fn();
    calculateHypotenuse = jest.fn();
  });

  it("calls addCoordinates", () => {
    GhostMovement.calculateDistance(
      assets,
      ghost,
      pathways,
      variables,
      addCoordinates,
      chase,
      scatter,
      calculateHypotenuse
    );
    expect(addCoordinates).toHaveBeenCalledTimes(2);
    expect(addCoordinates).toHaveBeenNthCalledWith(
      1,
      pathwayOne,
      ghost,
      variables
    );
    expect(addCoordinates).toHaveBeenNthCalledWith(
      2,
      pathwayTwo,
      ghost,
      variables
    );
  });

  it("calls chase if the ghost is chasing", () => {
    const chasingGhost = { isChasing: true };
    GhostMovement.calculateDistance(
      assets,
      chasingGhost,
      pathways,
      variables,
      addCoordinates,
      chase,
      scatter,
      calculateHypotenuse
    );
    expect(chase).toHaveBeenCalledTimes(2);
    expect(chase).toHaveBeenNthCalledWith(
      1,
      chasingGhost,
      pathwayOne,
      assets,
      variables
    );
    expect(chase).toHaveBeenNthCalledWith(
      2,
      chasingGhost,
      pathwayTwo,
      assets,
      variables
    );
  });

  it("calls scatter if the ghost is not chasing", () => {
    const scatteringGhost = { isChasing: false };
    GhostMovement.calculateDistance(
      assets,
      scatteringGhost,
      pathways,
      variables,
      addCoordinates,
      chase,
      scatter,
      calculateHypotenuse
    );
    expect(scatter).toHaveBeenCalledTimes(2);
    expect(scatter).toHaveBeenNthCalledWith(1, scatteringGhost, pathwayOne);
    expect(scatter).toHaveBeenNthCalledWith(2, scatteringGhost, pathwayTwo);
  });

  it("calls calculateHypotenus", () => {
    GhostMovement.calculateDistance(
      assets,
      ghost,
      pathways,
      variables,
      addCoordinates,
      chase,
      scatter,
      calculateHypotenuse
    );
    expect(calculateHypotenuse).toHaveBeenCalledTimes(2);
    expect(calculateHypotenuse).toHaveBeenNthCalledWith(
      1,
      undefined,
      pathwayOne
    );
    expect(calculateHypotenuse).toHaveBeenNthCalledWith(
      2,
      undefined,
      pathwayTwo
    );
  });
});
