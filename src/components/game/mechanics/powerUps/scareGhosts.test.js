import scareGhosts from "./scareGhosts";

let mockGhost;
let mockGhosts;
let mockCycleTimer;
let mockScaredTimer;

describe("scareGhosts", () => {
  beforeEach(() => {
    mockGhost = {
      isScared: false,
      isRetreating: false,
      changeScaredState: () => undefined,
    };
    mockGhosts = [mockGhost, mockGhost, mockGhost, mockGhost];
    mockCycleTimer = {
      isRunning: true,
      pause: () => undefined,
    };
    jest.spyOn(mockCycleTimer, "pause");
    mockScaredTimer = {
      reset: () => undefined,
      start: () => undefined,
    };
    jest.spyOn(mockScaredTimer, "reset");
    jest.spyOn(mockScaredTimer, "start");
  });

  it("pauses the cycleTimer if it is running", () => {
    scareGhosts(mockGhosts, mockCycleTimer, mockScaredTimer);
    expect(mockCycleTimer.pause).toHaveBeenCalledTimes(1);
  });

  it("does not pause the cycleTimer if it is not running", () => {
    mockCycleTimer.isRunning = false;
    scareGhosts(mockGhosts, mockCycleTimer, mockScaredTimer);
    expect(mockCycleTimer.pause).toHaveBeenCalledTimes(0);
  });

  it("resets the scaredTimer", () => {
    scareGhosts(mockGhosts, mockCycleTimer, mockScaredTimer);
    expect(mockScaredTimer.reset).toHaveBeenCalledTimes(1);
  });

  it("calls changeScaredState if the ghosts are not scared or retreating", () => {
    jest.spyOn(mockGhost, "changeScaredState");
    scareGhosts(mockGhosts, mockCycleTimer, mockScaredTimer);
    expect(mockGhost.changeScaredState).toHaveBeenCalledTimes(4);
  });

  it("does not call changeScaredState if the ghosts are scared", () => {
    const mockScaredGhost = {
      isScared: true,
      isRetreating: false,
      changeScaredState: () => undefined,
    };
    const mockScaredGhosts = [
      mockScaredGhost,
      mockScaredGhost,
      mockScaredGhost,
      mockScaredGhost,
    ];
    jest.spyOn(mockScaredGhost, "changeScaredState");
    scareGhosts(mockScaredGhosts, mockCycleTimer, mockScaredTimer);
    expect(mockScaredGhost.changeScaredState).toHaveBeenCalledTimes(0);
  });

  it("does not call changeScaredState if the ghosts are retreating", () => {
    const mockRetreatingGhost = {
      isScared: false,
      isRetreating: true,
      changeScaredState: () => undefined,
    };
    const mockRetreatingGhosts = [
      mockRetreatingGhost,
      mockRetreatingGhost,
      mockRetreatingGhost,
      mockRetreatingGhost,
    ];
    jest.spyOn(mockRetreatingGhost, "changeScaredState");
    scareGhosts(mockRetreatingGhosts, mockCycleTimer, mockScaredTimer);
    expect(mockRetreatingGhost.changeScaredState).toHaveBeenCalledTimes(0);
  });

  it("starts the scaredTimer", () => {
    scareGhosts(mockGhosts, mockCycleTimer, mockScaredTimer);
    expect(mockScaredTimer.start).toHaveBeenCalledTimes(1);
    expect(mockScaredTimer.start).toHaveBeenCalledWith(mockCycleTimer);
  });
});
