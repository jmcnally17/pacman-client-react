import PacmanManager from "./pacmanManager";

describe("checkIfPacmanIsEating", () => {
  let pellet;
  let pacman;
  let assets;

  beforeEach(() => {
    pellet = { position: { x: 200, y: 300 }, radius: 2, hasBeenEaten: false };
    pacman = {
      position: { x: 195, y: 300 },
      velocity: { x: 2.5, y: 0 },
      radius: 7.5,
      isEating: false,
    };
    assets = { props: { pellets: [pellet] }, characters: { pacman: pacman } };
  });

  it("changes isEating to true if Pac-Man is about to collide with a pellet that has not been eaten", () => {
    PacmanManager.checkIfPacmanIsEating(assets);
    expect(pacman.isEating).toBeTruthy();
  });

  it("changes isEating to false if Pac-Man is not about to collide with a pellet", () => {
    pellet.position.x = 500;
    pacman.isEating = true;
    PacmanManager.checkIfPacmanIsEating(assets);
    expect(pacman.isEating).toBeFalsy();
  });

  it("changes isEating to false if Pac-Man is about to collide with a pellet that has been eaten", () => {
    pellet.hasBeenEaten = true;
    pacman.isEating = true;
    PacmanManager.checkIfPacmanIsEating(assets);
    expect(pacman.isEating).toBeFalsy();
  });
});
