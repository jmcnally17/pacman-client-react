import endGame from "./endGame";
import Leaderboard from "../../../../../../leaderboard/leaderboard";

jest.mock("../../../../../../leaderboard/leaderboard");

let mockVariables;
let mockPellets;
let mockPowerUps;
let mockGhosts;
let mockPacman;
let mockCycleTimer;
let mockScaredTimer;
let mockCtx;
let mockDisplayPleaseWait;
let mockSaveScore;
let mockResetAfterGameOver;

describe("endGame", () => {
  beforeEach(() => {
    Leaderboard.mockClear();
    mockVariables = {
      player: {
        username: "person",
      },
      animationId: "animationId",
      reactRoot: {
        render: () => undefined,
      },
    };
    mockPellets = "pellets";
    mockPowerUps = "powerUps";
    mockGhosts = "ghosts";
    mockPacman = "pacman";
    mockCycleTimer = "cycleTimer";
    mockScaredTimer = "scaredTimer";
    mockCtx = "ctx";
    mockDisplayPleaseWait = jest.fn();
    mockSaveScore = jest.fn();
    mockResetAfterGameOver = jest.fn();
    jest.spyOn(mockVariables.reactRoot, "render");
  });

  it("calls cancelAnimationFrame on the current animationId", () => {
    jest.spyOn(global, "cancelAnimationFrame");
    endGame(
      mockVariables,
      mockPellets,
      mockPowerUps,
      mockGhosts,
      mockPacman,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockDisplayPleaseWait,
      mockSaveScore,
      mockResetAfterGameOver
    );
    expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(
      mockVariables.animationId
    );
  });

  it("calls displayPleaseWait", () => {
    endGame(
      mockVariables,
      mockPellets,
      mockPowerUps,
      mockGhosts,
      mockPacman,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockDisplayPleaseWait,
      mockSaveScore,
      mockResetAfterGameOver
    );
    expect(mockDisplayPleaseWait).toHaveBeenCalledTimes(1);
    expect(mockDisplayPleaseWait).toHaveBeenCalledWith(mockCtx);
  });

  it("calls saveScore when the player is not undefined", () => {
    endGame(
      mockVariables,
      mockPellets,
      mockPowerUps,
      mockGhosts,
      mockPacman,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockDisplayPleaseWait,
      mockSaveScore,
      mockResetAfterGameOver
    );
    expect(mockSaveScore).toHaveBeenCalledTimes(1);
    expect(mockSaveScore).toHaveBeenCalledWith(mockVariables);
  });

  it("does not call saveScore when the player is undefined", () => {
    mockVariables.player = undefined;
    endGame(
      mockVariables,
      mockPellets,
      mockPowerUps,
      mockGhosts,
      mockPacman,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockDisplayPleaseWait,
      mockSaveScore,
      mockResetAfterGameOver
    );
    expect(mockSaveScore).toHaveBeenCalledTimes(0);
  });

  it("calls resetAfterGameOver", async () => {
    await endGame(
      mockVariables,
      mockPellets,
      mockPowerUps,
      mockGhosts,
      mockPacman,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockDisplayPleaseWait,
      mockSaveScore,
      mockResetAfterGameOver
    );
    expect(mockResetAfterGameOver).toHaveBeenCalledTimes(1);
    expect(mockResetAfterGameOver).toHaveBeenCalledWith(
      mockPellets,
      mockPowerUps,
      mockGhosts,
      mockPacman,
      mockVariables,
      mockCycleTimer,
      mockScaredTimer
    );
  });

  it("renders the Leaderboard component", async () => {
    await endGame(
      mockVariables,
      mockPellets,
      mockPowerUps,
      mockGhosts,
      mockPacman,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockDisplayPleaseWait,
      mockSaveScore,
      mockResetAfterGameOver
    );
    expect(mockVariables.reactRoot.render).toHaveBeenCalledTimes(1);
    expect(mockVariables.reactRoot.render).toHaveBeenCalledWith(
      <Leaderboard variables={mockVariables} />
    );
  });
});
