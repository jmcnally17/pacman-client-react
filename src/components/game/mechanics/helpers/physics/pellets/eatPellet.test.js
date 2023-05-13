import eatPellet from "./eatPellet";

let mockPellet;
let mockPacmanOne;
let mockPacmanTwo;
let mockVariables;

describe("eatPellet", () => {
  beforeEach(() => {
    mockPellet = {
      position: {
        x: 200,
        y: 200,
      },
      changeEatenState: () => undefined,
      hasBeenEaten: false,
    };
    mockPacmanOne = {
      position: {
        x: 200,
        y: 200,
      },
    };
    mockPacmanTwo = {
      position: {
        x: 250,
        y: 250,
      },
    };
    jest.spyOn(mockPellet, "changeEatenState");
    mockVariables = {
      score: 0,
    };
  });

  it("calls changeEatenState when the pellet collides with Pac-Man", () => {
    eatPellet(mockPellet, mockPacmanOne, mockVariables);
    expect(mockPellet.changeEatenState).toHaveBeenCalledTimes(1);
  });

  it("increases the score when the pellet collides with Pac-Man", () => {
    eatPellet(mockPellet, mockPacmanOne, mockVariables);
    expect(mockVariables.score).toBe(10);
  });

  it("does not call changeEatenState if the pellet and pacman are not colliding", () => {
    eatPellet(mockPellet, mockPacmanTwo, mockVariables);
    expect(mockPellet.changeEatenState).toHaveBeenCalledTimes(0);
  });

  it("does not increase the score if the pellet and pacman are not colliding", () => {
    eatPellet(mockPellet, mockPacmanTwo, mockVariables);
    expect(mockVariables.score).toBe(0);
  });
});
