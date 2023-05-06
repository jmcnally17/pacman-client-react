import implementGhosts from "./implementGhosts";

let mockGhostOne;
let mockGhostsOne;
let mockGhostTwo;
let mockGhostsTwo;
let mockBoundaries;
let mockCtx;
let mockVariables;
let mockPacman;
let mockPellets;
let mockPowerUps;
let mockCycleTimer;
let mockScaredTimer;
let mockAudioPlayer;
let mockcheckSpeedMatchesState;
let mockImplementTunnel;
let mockUpdateCollisions;
let mockChooseMovement;
let mockCheckPacmanGhostCollision;

describe("implementGhosts", () => {
  beforeEach(() => {
    mockGhostOne = {
      update: () => undefined,
      prevCollisions: ["up", "down"],
    };
    mockGhostsOne = [mockGhostOne, mockGhostOne, mockGhostOne];
    mockGhostTwo = {
      update: () => undefined,
      prevCollisions: [],
    };
    mockGhostsTwo = [mockGhostTwo, mockGhostTwo];
    mockBoundaries = "boundaries";
    mockCtx = "ctx";
    mockVariables = "variables";
    mockPacman = "pacman";
    mockPellets = "pellets";
    mockPowerUps = "powerUps";
    mockCycleTimer = "cycleTimer";
    mockScaredTimer = "scaredTimer";
    mockAudioPlayer = "audioPlayer";
    mockcheckSpeedMatchesState = jest.fn();
    mockImplementTunnel = jest.fn();
    mockUpdateCollisions = jest.fn();
    mockChooseMovement = jest.fn();
    mockCheckPacmanGhostCollision = jest.fn();
  });

  it("calls checkSpeedMatchesState on each ghost", () => {
    implementGhosts(
      mockGhostsOne,
      mockBoundaries,
      mockCtx,
      mockVariables,
      mockPacman,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockcheckSpeedMatchesState,
      mockImplementTunnel,
      mockUpdateCollisions,
      mockChooseMovement,
      mockCheckPacmanGhostCollision
    );
    expect(mockcheckSpeedMatchesState).toHaveBeenCalledTimes(3);
    expect(mockcheckSpeedMatchesState).toHaveBeenCalledWith(
      mockGhostOne,
      mockVariables
    );
  });

  it("calls update on each ghost", () => {
    jest.spyOn(mockGhostOne, "update");
    implementGhosts(
      mockGhostsOne,
      mockBoundaries,
      mockCtx,
      mockVariables,
      mockPacman,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockcheckSpeedMatchesState,
      mockImplementTunnel,
      mockUpdateCollisions,
      mockChooseMovement,
      mockCheckPacmanGhostCollision
    );
    expect(mockGhostOne.update).toHaveBeenCalledTimes(3);
    expect(mockGhostOne.update).toHaveBeenCalledWith(mockCtx);
  });

  it("calls implementTunnel on each ghost", () => {
    implementGhosts(
      mockGhostsOne,
      mockBoundaries,
      mockCtx,
      mockVariables,
      mockPacman,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockcheckSpeedMatchesState,
      mockImplementTunnel,
      mockUpdateCollisions,
      mockChooseMovement,
      mockCheckPacmanGhostCollision
    );
    expect(mockImplementTunnel).toHaveBeenCalledTimes(3);
    expect(mockImplementTunnel).toHaveBeenCalledWith(
      mockGhostOne,
      mockVariables
    );
  });

  it("calls updatesCollisions on each ghost", () => {
    implementGhosts(
      mockGhostsOne,
      mockBoundaries,
      mockCtx,
      mockVariables,
      mockPacman,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockcheckSpeedMatchesState,
      mockImplementTunnel,
      mockUpdateCollisions,
      mockChooseMovement,
      mockCheckPacmanGhostCollision
    );
    expect(mockUpdateCollisions).toHaveBeenCalledTimes(3);
    expect(mockUpdateCollisions).toHaveBeenCalledWith(
      mockBoundaries,
      [],
      mockGhostOne
    );
  });

  it("calls chooseMovement on each ghost if the collisions array does not match the prevCollisions array in the ghost", () => {
    implementGhosts(
      mockGhostsOne,
      mockBoundaries,
      mockCtx,
      mockVariables,
      mockPacman,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockcheckSpeedMatchesState,
      mockImplementTunnel,
      mockUpdateCollisions,
      mockChooseMovement,
      mockCheckPacmanGhostCollision
    );
    expect(mockChooseMovement).toHaveBeenCalledTimes(3);
    expect(mockChooseMovement).toHaveBeenCalledWith(
      mockGhostOne,
      mockPacman,
      [],
      mockVariables,
      mockGhostOne
    );
  });

  it("does not call chooseMovement on each ghost when the collisions array is equal to the prevCollisions array", () => {
    implementGhosts(
      mockGhostsTwo,
      mockBoundaries,
      mockCtx,
      mockVariables,
      mockPacman,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockcheckSpeedMatchesState,
      mockImplementTunnel,
      mockUpdateCollisions,
      mockChooseMovement,
      mockCheckPacmanGhostCollision
    );
    expect(mockChooseMovement).toHaveBeenCalledTimes(0);
  });

  it("calls checkPacmanGhostCollision on each ghost", () => {
    implementGhosts(
      mockGhostsOne,
      mockBoundaries,
      mockCtx,
      mockVariables,
      mockPacman,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockcheckSpeedMatchesState,
      mockImplementTunnel,
      mockUpdateCollisions,
      mockChooseMovement,
      mockCheckPacmanGhostCollision
    );
    expect(mockCheckPacmanGhostCollision).toHaveBeenCalledTimes(3);
    expect(mockCheckPacmanGhostCollision).toHaveBeenCalledWith(
      mockGhostOne,
      mockPacman,
      mockVariables,
      mockGhostsOne,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockCtx,
      mockBoundaries
    );
  });
});
