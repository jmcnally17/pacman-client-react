import GhostManager from "./ghostManager";

describe("checkPacmanGhostCollision", () => {
  let ghost;
  let assets;
  let variables;
  let ctx;
  let collisionConditional;
  let dealWithCollision;

  beforeEach(() => {
    ghost = "ghost";
    assets = { characters: { pacman: "pacman" } };
    variables = "variables";
    ctx = "ctx";
    collisionConditional = jest.fn();
    dealWithCollision = jest.fn();
  });

  it("calls collisionConditional to check if Pac-Man and the ghost are colliding", () => {
    GhostManager.checkPacmanGhostCollision(
      ghost,
      assets,
      variables,
      ctx,
      collisionConditional,
      dealWithCollision
    );
    expect(collisionConditional).toHaveBeenCalledTimes(1);
    expect(collisionConditional).toHaveBeenCalledWith(
      ghost,
      assets.characters.pacman
    );
  });

  it("calls dealWithCollision when the collisionConditional is true", () => {
    collisionConditional.mockReturnValueOnce(true);
    GhostManager.checkPacmanGhostCollision(
      ghost,
      assets,
      variables,
      ctx,
      collisionConditional,
      dealWithCollision
    );
    expect(dealWithCollision).toHaveBeenCalledTimes(1);
    expect(dealWithCollision).toHaveBeenCalledWith(
      ghost,
      assets,
      variables,
      ctx
    );
  });

  it("does not call dealWithCollision when the collisionConditional is false", () => {
    collisionConditional.mockReturnValueOnce(false);
    GhostManager.checkPacmanGhostCollision(
      ghost,
      assets,
      variables,
      ctx,
      collisionConditional,
      dealWithCollision
    );
    expect(dealWithCollision).toHaveBeenCalledTimes(0);
  });
});
