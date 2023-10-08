import PelletManager from "./pelletManager";

describe("eatPellet", () => {
  let pellet;
  let pacmanOne;
  let pacmanTwo;
  let variables;

  beforeEach(() => {
    pellet = {
      position: { x: 200, y: 200 },
      changeEatenState: () => undefined,
      hasBeenEaten: false,
    };
    pacmanOne = { position: { x: 200, y: 200 } };
    pacmanTwo = { position: { x: 250, y: 250 } };
    jest.spyOn(pellet, "changeEatenState");
    variables = { score: 0 };
  });

  it("calls changeEatenState when the pellet collides with Pac-Man", () => {
    PelletManager.eatPellet(pellet, pacmanOne, variables);
    expect(pellet.changeEatenState).toHaveBeenCalledTimes(1);
  });

  it("increases the score when the pellet collides with Pac-Man", () => {
    PelletManager.eatPellet(pellet, pacmanOne, variables);
    expect(variables.score).toBe(10);
  });

  it("does not call changeEatenState if the pellet and pacman are not colliding", () => {
    PelletManager.eatPellet(pellet, pacmanTwo, variables);
    expect(pellet.changeEatenState).toHaveBeenCalledTimes(0);
  });

  it("does not increase the score if the pellet and pacman are not colliding", () => {
    PelletManager.eatPellet(pellet, pacmanTwo, variables);
    expect(variables.score).toBe(0);
  });
});
