import resetAfterDeath from "./resetAfterDeath";

let mockPacman;
let mockVariables;
let mockCycleTimer;
let mockScaredTimer;
let mockGhost;
let mockGhosts;
let mockAudioPlayer;
let mockPlayGame;

describe("resetAfterDeath", () => {
  beforeEach(() => {
    mockPacman = {
      reset: () => undefined,
    };
    mockVariables = {
      lastKeyPressed: "up",
      player: {
        username: "John",
      },
      reactRoot: "reactRoot",
    };
    mockCycleTimer = {
      reset: () => undefined,
      start: () => undefined,
    };
    mockScaredTimer = {
      reset: () => undefined,
    };
    mockGhost = {
      reset: () => undefined,
    };
    mockGhosts = [mockGhost, mockGhost, mockGhost];
    mockAudioPlayer = {
      ghostAudioWantsToPlay: false,
    };
    mockPlayGame = jest.fn();
  });

  it("resets Pac-Man", () => {
    jest.spyOn(mockPacman, "reset");
    resetAfterDeath(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockPacman.reset).toHaveBeenCalledTimes(1);
  });

  it("resets the last key pressed", () => {
    resetAfterDeath(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockVariables.lastKeyPressed).toBe("");
  });

  it("resets the cycle timer", () => {
    jest.spyOn(mockCycleTimer, "reset");
    resetAfterDeath(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockCycleTimer.reset).toHaveBeenCalledTimes(1);
  });

  it("resets the scared timer", () => {
    jest.spyOn(mockScaredTimer, "reset");
    resetAfterDeath(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockScaredTimer.reset).toHaveBeenCalledTimes(1);
  });

  it("resets the ghosts", () => {
    jest.spyOn(mockGhost, "reset");
    resetAfterDeath(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockGhost.reset).toHaveBeenCalledTimes(3);
  });

  it("starts the cycle timer again", () => {
    jest.spyOn(mockCycleTimer, "start");
    resetAfterDeath(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockCycleTimer.start).toHaveBeenCalledTimes(1);
  });

  it("sets ghostAudioWantsToPlay in the audioPlayer to true", () => {
    resetAfterDeath(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockAudioPlayer.ghostAudioWantsToPlay).toBe(true);
  });

  it("calls playGame", () => {
    resetAfterDeath(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockPlayGame).toHaveBeenCalledTimes(1);
    expect(mockPlayGame).toHaveBeenCalledWith(
      mockVariables.player,
      mockVariables.reactRoot
    );
  });
});
