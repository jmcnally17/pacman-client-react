import GhostCollision from "./ghostCollision";

describe("resetAfterDeath", () => {
  let pacman;
  let cycleTimer;
  let scaredTimer;
  let ghost;
  let ghosts;
  let audioPlayer;
  let assets;
  let variables;
  let mockPlayGame;

  beforeEach(() => {
    pacman = { reset: () => undefined };
    ghost = { reset: () => undefined };
    ghosts = { red: ghost, pink: ghost, cyan: ghost, orange: ghost };
    cycleTimer = { reset: () => undefined, start: () => undefined };
    scaredTimer = { reset: () => undefined };
    audioPlayer = { ghostAudioWantsToPlay: false };
    assets = {
      characters: { ghosts: ghosts, pacman: pacman },
      timers: { cycleTimer: cycleTimer, scaredTimer: scaredTimer },
      audioPlayer: audioPlayer,
    };
    variables = {
      lastKeyPressed: "up",
      player: { username: "John" },
      reactRoot: "reactRoot",
    };
    mockPlayGame = jest.fn();
  });

  it("resets Pac-Man", () => {
    jest.spyOn(pacman, "reset");
    GhostCollision.resetAfterDeath(assets, variables, mockPlayGame);
    expect(pacman.reset).toHaveBeenCalledTimes(1);
  });

  it("resets the last key pressed", () => {
    GhostCollision.resetAfterDeath(assets, variables, mockPlayGame);
    expect(variables.lastKeyPressed).toBe("");
  });

  it("resets the cycle timer", () => {
    jest.spyOn(cycleTimer, "reset");
    GhostCollision.resetAfterDeath(assets, variables, mockPlayGame);
    expect(cycleTimer.reset).toHaveBeenCalledTimes(1);
  });

  it("resets the scared timer", () => {
    jest.spyOn(scaredTimer, "reset");
    GhostCollision.resetAfterDeath(assets, variables, mockPlayGame);
    expect(scaredTimer.reset).toHaveBeenCalledTimes(1);
  });

  it("resets the ghosts", () => {
    jest.spyOn(ghost, "reset");
    GhostCollision.resetAfterDeath(assets, variables, mockPlayGame);
    expect(ghost.reset).toHaveBeenCalledTimes(4);
  });

  it("starts the cycle timer again", () => {
    jest.spyOn(cycleTimer, "start");
    GhostCollision.resetAfterDeath(assets, variables, mockPlayGame);
    expect(cycleTimer.start).toHaveBeenCalledTimes(1);
  });

  it("sets ghostAudioWantsToPlay in the audioPlayer to true", () => {
    GhostCollision.resetAfterDeath(assets, variables, mockPlayGame);
    expect(audioPlayer.ghostAudioWantsToPlay).toBe(true);
  });

  it("calls playGame", () => {
    GhostCollision.resetAfterDeath(assets, variables, mockPlayGame);
    expect(mockPlayGame).toHaveBeenCalledTimes(1);
    expect(mockPlayGame).toHaveBeenCalledWith(
      variables.player,
      variables.reactRoot
    );
  });
});
