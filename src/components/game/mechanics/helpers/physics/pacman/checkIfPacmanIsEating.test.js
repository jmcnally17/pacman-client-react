import checkIfPacmanIsEating from "./checkIfPacmanIsEating";

let mockPellet;
let mockPellets;
let mockPacman;

describe("checkIfPacmanIsEating", () => {
  beforeEach(() => {
    mockPellet = {
      position: {
        x: 200,
        y: 300,
      },
      radius: 2,
      hasBeenEaten: false,
    };
    mockPellets = [mockPellet];
    mockPacman = {
      position: {
        x: 195,
        y: 300,
      },
      velocity: {
        x: 2.5,
        y: 0,
      },
      radius: 7.5,
      isEating: false,
    };
  });

  it("changes isEating to true if Pac-Man is about to collide with a pellet that has not been eaten", () => {
    checkIfPacmanIsEating(mockPellets, mockPacman);
    expect(mockPacman.isEating).toBeTruthy();
  });

  it("changes isEating to false if Pac-Man is not about to collide with a pellet", () => {
    mockPellet.position.x = 500;
    mockPacman.isEating = true;
    checkIfPacmanIsEating(mockPellets, mockPacman);
    expect(mockPacman.isEating).toBeFalsy();
  });

  it("changes isEating to false if Pac-Man is about to collide with a pellet that has been eaten", () => {
    mockPellet.hasBeenEaten = true;
    mockPacman.isEating = true;
    checkIfPacmanIsEating(mockPellets, mockPacman);
    expect(mockPacman.isEating).toBeFalsy();
  });
});
