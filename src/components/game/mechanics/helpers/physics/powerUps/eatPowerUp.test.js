import PowerUpManager from "./powerUpManager";

describe("eatPowerUp", () => {
  let powerUp;
  let pacmanOne;
  let pacmanTwo;
  let assets;
  let variables;
  let scareGhosts;

  beforeEach(() => {
    powerUp = {
      position: { x: 200, y: 200 },
      changeEatenState: () => undefined,
    };
    pacmanOne = { position: { x: 200, y: 200 } };
    pacmanTwo = { position: { x: 250, y: 250 } };
    assets = { characters: { pacman: pacmanOne } };
    variables = { score: 0, killCount: 2 };
    scareGhosts = jest.fn();
    jest.spyOn(powerUp, "changeEatenState");
  });

  it("calls changeEatenState when Pac-Man collides with the power up", () => {
    PowerUpManager.eatPowerUp(powerUp, assets, variables, scareGhosts);
    expect(powerUp.changeEatenState).toHaveBeenCalledTimes(1);
  });

  it("increases the score when Pac-Man collides with the power up", () => {
    PowerUpManager.eatPowerUp(powerUp, assets, variables, scareGhosts);
    expect(variables.score).toBe(50);
  });

  it("resets the kill count to 0 when Pac-Man collides with the power up", () => {
    PowerUpManager.eatPowerUp(powerUp, assets, variables, scareGhosts);
    expect(variables.killCount).toBe(0);
  });

  it("calls scareGhosts when Pac-Man collides with the power up", () => {
    PowerUpManager.eatPowerUp(powerUp, assets, variables, scareGhosts);
    expect(scareGhosts).toHaveBeenCalledTimes(1);
    expect(scareGhosts).toHaveBeenCalledWith(assets);
  });

  it("does not call changeEatenState if the power up and pacman are not colliding", () => {
    assets.characters.pacman = pacmanTwo;
    PowerUpManager.eatPowerUp(powerUp, assets, variables, scareGhosts);
    expect(powerUp.changeEatenState).toHaveBeenCalledTimes(0);
  });

  it("does not increase the score if the power up and pacman are not colliding", () => {
    assets.characters.pacman = pacmanTwo;
    PowerUpManager.eatPowerUp(powerUp, assets, variables, scareGhosts);
    expect(variables.score).toBe(0);
  });

  it("does not reset the kill count if the power up and pacman are not colliding", () => {
    assets.characters.pacman = pacmanTwo;
    PowerUpManager.eatPowerUp(powerUp, assets, variables, scareGhosts);
    expect(variables.killCount).toBe(2);
  });

  it("does not call scareGhost if the power up and pacman are not colliding", () => {
    assets.characters.pacman = pacmanTwo;
    PowerUpManager.eatPowerUp(powerUp, assets, variables, scareGhosts);
    expect(scareGhosts).toHaveBeenCalledTimes(0);
  });
});
