import GhostCollision from "./ghostCollision";

describe("checkPacmanLives", () => {
  let pacman;
  let noLivesPacman;
  let assets;
  let variables;
  let ctx;
  let endGame;
  let resetAfterDeath;

  beforeEach(() => {
    pacman = { lives: 2 };
    noLivesPacman = { lives: 0 };
    assets = { characters: { pacman: pacman } };
    variables = "variables";
    ctx = "ctx";
    endGame = jest.fn();
    resetAfterDeath = jest.fn();
  });

  it("calls endGame when Pac-Man has no lives left", () => {
    assets.characters.pacman = noLivesPacman;
    GhostCollision.checkPacmanLives(
      assets,
      variables,
      ctx,
      endGame,
      resetAfterDeath
    );
    expect(endGame).toHaveBeenCalledTimes(1);
    expect(endGame).toHaveBeenCalledWith(variables, assets, ctx);
  });

  it("decreases Pac-Man's lives by 1 when he has lives left", () => {
    GhostCollision.checkPacmanLives(
      assets,
      variables,
      ctx,
      endGame,
      resetAfterDeath
    );
    expect(pacman.lives).toBe(1);
  });

  it("calls resetAfterDeath when Pac-Man has lives left", () => {
    GhostCollision.checkPacmanLives(
      assets,
      variables,
      ctx,
      endGame,
      resetAfterDeath
    );
    expect(resetAfterDeath).toHaveBeenCalledTimes(1);
    expect(resetAfterDeath).toHaveBeenCalledWith(assets, variables);
  });
});
