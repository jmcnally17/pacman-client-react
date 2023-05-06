import eatPowerUp from "./eatPowerUp";

let mockPowerUp;
let mockPacmanOne;
let mockPacmanTwo;
let mockVariables;
let mockGhosts;
let mockScaredTimer;
let mockCycleTimer;
let mockScareGhosts;

describe("eatPowerUp", () => {
  beforeEach(() => {
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
    mockPowerUp = {
      position: {
        x: 200,
        y: 200,
      },
      changeEatenState: () => undefined,
    };
    jest.spyOn(mockPowerUp, "changeEatenState");
    mockVariables = {
      score: 0,
      killCount: 2,
    };
    mockGhosts = "ghosts";
    mockScaredTimer = "scaredTimer";
    mockCycleTimer = "cycleTimer";
    mockScareGhosts = jest.fn();
  });

  it("calls changeEatenState when Pac-Man collides with the power up", () => {
    eatPowerUp(
      mockPowerUp,
      mockPacmanOne,
      mockVariables,
      mockGhosts,
      mockScaredTimer,
      mockCycleTimer,
      mockScareGhosts
    );
    expect(mockPowerUp.changeEatenState).toHaveBeenCalledTimes(1);
  });

  it("increases the score when Pac-Man collides with the power up", () => {
    eatPowerUp(
      mockPowerUp,
      mockPacmanOne,
      mockVariables,
      mockGhosts,
      mockScaredTimer,
      mockCycleTimer,
      mockScareGhosts
    );
    expect(mockVariables.score).toBe(50);
  });

  it("resets the kill count to 0 when Pac-Man collides with the power up", () => {
    eatPowerUp(
      mockPowerUp,
      mockPacmanOne,
      mockVariables,
      mockGhosts,
      mockScaredTimer,
      mockCycleTimer,
      mockScareGhosts
    );
    expect(mockVariables.killCount).toBe(0);
  });

  it("calls scareGhosts when Pac-Man collides with the power up", () => {
    eatPowerUp(
      mockPowerUp,
      mockPacmanOne,
      mockVariables,
      mockGhosts,
      mockScaredTimer,
      mockCycleTimer,
      mockScareGhosts
    );
    expect(mockScareGhosts).toHaveBeenCalledTimes(1);
    expect(mockScareGhosts).toHaveBeenCalledWith(
      mockGhosts,
      mockCycleTimer,
      mockScaredTimer
    );
  });

  it("does not call changeEatenState if the power up and pacman are not colliding", () => {
    eatPowerUp(
      mockPowerUp,
      mockPacmanTwo,
      mockVariables,
      mockGhosts,
      mockScaredTimer,
      mockCycleTimer,
      mockScareGhosts
    );
    expect(mockPowerUp.changeEatenState).toHaveBeenCalledTimes(0);
  });

  it("does not increase the score if the power up and pacman are not colliding", () => {
    eatPowerUp(
      mockPowerUp,
      mockPacmanTwo,
      mockVariables,
      mockGhosts,
      mockScaredTimer,
      mockCycleTimer,
      mockScareGhosts
    );
    expect(mockVariables.score).toBe(0);
  });

  it("does not reset the kill count if the power up and pacman are not colliding", () => {
    eatPowerUp(
      mockPowerUp,
      mockPacmanTwo,
      mockVariables,
      mockGhosts,
      mockScaredTimer,
      mockCycleTimer,
      mockScareGhosts
    );
    expect(mockVariables.killCount).toBe(2);
  });

  it("does not call scareGhost if the power up and pacman are not colliding", () => {
    eatPowerUp(
      mockPowerUp,
      mockPacmanTwo,
      mockVariables,
      mockGhosts,
      mockScaredTimer,
      mockCycleTimer,
      mockScareGhosts
    );
    expect(mockScareGhosts).toHaveBeenCalledTimes(0);
  });
});
