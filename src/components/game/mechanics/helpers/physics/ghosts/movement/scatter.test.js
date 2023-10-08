import GhostMovement from "./ghostMovement";

describe("scatter", () => {
  let pathway;
  let findRedScatterPath;
  let findPinkScatterPath;
  let findCyanScatterPath;
  let findOrangeScatterPath;

  beforeEach(() => {
    pathway = "pathway";
    findRedScatterPath = jest.fn();
    findPinkScatterPath = jest.fn();
    findCyanScatterPath = jest.fn();
    findOrangeScatterPath = jest.fn();
  });

  it("calls findRedScatterPath if the ghost is red", () => {
    const redGhost = { colour: "red" };
    GhostMovement.scatter(
      redGhost,
      pathway,
      findRedScatterPath,
      findPinkScatterPath,
      findCyanScatterPath,
      findOrangeScatterPath
    );
    expect(findRedScatterPath).toHaveBeenCalledTimes(1);
    expect(findRedScatterPath).toHaveBeenCalledWith(pathway);
  });

  it("calls findPinkScatterPath if the ghost is pink", () => {
    const pinkGhost = { colour: "pink" };
    GhostMovement.scatter(
      pinkGhost,
      pathway,
      findRedScatterPath,
      findPinkScatterPath,
      findCyanScatterPath,
      findOrangeScatterPath
    );
    expect(findPinkScatterPath).toHaveBeenCalledTimes(1);
    expect(findPinkScatterPath).toHaveBeenCalledWith(pathway);
  });

  it("calls findCyanScatterPath if the ghost is cyan", () => {
    const cyanGhost = { colour: "cyan" };
    GhostMovement.scatter(
      cyanGhost,
      pathway,
      findRedScatterPath,
      findPinkScatterPath,
      findCyanScatterPath,
      findOrangeScatterPath
    );
    expect(findCyanScatterPath).toHaveBeenCalledTimes(1);
    expect(findCyanScatterPath).toHaveBeenCalledWith(pathway);
  });

  it("calls findOrangeScatterPath if the ghost is orange", () => {
    const orangeGhost = { colour: "orange" };
    GhostMovement.scatter(
      orangeGhost,
      pathway,
      findRedScatterPath,
      findPinkScatterPath,
      findCyanScatterPath,
      findOrangeScatterPath
    );
    expect(findOrangeScatterPath).toHaveBeenCalledTimes(1);
    expect(findOrangeScatterPath).toHaveBeenCalledWith(pathway);
  });
});
