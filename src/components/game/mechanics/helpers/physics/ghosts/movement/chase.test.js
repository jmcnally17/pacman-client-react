import GhostMovement from "./ghostMovement";

describe("chase", () => {
  let pathway;
  let assets;
  let variables;
  let isOrangeFarFromPacman;
  let findRedOrangeAimPath;
  let findPinkAimPath;
  let findCyanAimPath;
  let findOrangeScatterPath;

  beforeEach(() => {
    pathway = "pathway";
    assets = { characters: { pacman: "pacman" } };
    variables = "variables";
    isOrangeFarFromPacman = jest.fn();
    findRedOrangeAimPath = jest.fn();
    findPinkAimPath = jest.fn();
    findCyanAimPath = jest.fn();
    findOrangeScatterPath = jest.fn();
  });

  it("calls findRedOrangeAimPath if the ghost is red", () => {
    const redGhost = { colour: "red" };
    GhostMovement.chase(
      redGhost,
      pathway,
      assets,
      variables,
      isOrangeFarFromPacman,
      findRedOrangeAimPath,
      findPinkAimPath,
      findCyanAimPath,
      findOrangeScatterPath
    );
    expect(findRedOrangeAimPath).toHaveBeenCalledTimes(1);
    expect(findRedOrangeAimPath).toHaveBeenCalledWith(
      assets.characters.pacman,
      pathway
    );
  });

  it("calls findPinkAimPath if the ghost is pink", () => {
    const pinkGhost = { colour: "pink" };
    GhostMovement.chase(
      pinkGhost,
      pathway,
      assets,
      variables,
      isOrangeFarFromPacman,
      findRedOrangeAimPath,
      findPinkAimPath,
      findCyanAimPath,
      findOrangeScatterPath
    );
    expect(findPinkAimPath).toHaveBeenCalledTimes(1);
    expect(findPinkAimPath).toHaveBeenCalledWith(
      assets.characters.pacman,
      pathway,
      variables
    );
  });

  it("calls findCyanAimPath if the ghost is cyan", () => {
    const cyanGhost = { colour: "cyan" };
    GhostMovement.chase(
      cyanGhost,
      pathway,
      assets,
      variables,
      isOrangeFarFromPacman,
      findRedOrangeAimPath,
      findPinkAimPath,
      findCyanAimPath,
      findOrangeScatterPath
    );
    expect(findCyanAimPath).toHaveBeenCalledTimes(1);
    expect(findCyanAimPath).toHaveBeenCalledWith(assets, variables, pathway);
  });

  it("calls isOrangeFarFromPacman if the ghost is orange", () => {
    const orangeGhost = { colour: "orange" };
    GhostMovement.chase(
      orangeGhost,
      pathway,
      assets,
      variables,
      isOrangeFarFromPacman,
      findRedOrangeAimPath,
      findPinkAimPath,
      findCyanAimPath,
      findOrangeScatterPath
    );
    expect(isOrangeFarFromPacman).toHaveBeenCalledTimes(1);
    expect(isOrangeFarFromPacman).toHaveBeenCalledWith(
      orangeGhost,
      assets.characters.pacman,
      variables
    );
  });

  it("calls findRedOrangeAimPath if the ghost is orange and is far away from Pac-Man", () => {
    const orangeGhost = { colour: "orange" };
    isOrangeFarFromPacman.mockReturnValue(true);
    GhostMovement.chase(
      orangeGhost,
      pathway,
      assets,
      variables,
      isOrangeFarFromPacman,
      findRedOrangeAimPath,
      findPinkAimPath,
      findCyanAimPath,
      findOrangeScatterPath
    );
    expect(findRedOrangeAimPath).toHaveBeenCalledTimes(1);
    expect(findRedOrangeAimPath).toHaveBeenCalledWith(
      assets.characters.pacman,
      pathway
    );
  });

  it("calls findOrangeScatterPath if the ghost is orange and is close to Pac-Man", () => {
    const orangeGhost = { colour: "orange" };
    isOrangeFarFromPacman.mockReturnValue(false);
    GhostMovement.chase(
      orangeGhost,
      pathway,
      assets,
      variables,
      isOrangeFarFromPacman,
      findRedOrangeAimPath,
      findPinkAimPath,
      findCyanAimPath,
      findOrangeScatterPath
    );
    expect(findOrangeScatterPath).toHaveBeenCalledTimes(1);
    expect(findOrangeScatterPath).toHaveBeenCalledWith(pathway);
  });
});
