import ScaredTimer from "./scaredTimer";

jest.useFakeTimers();

describe("ScaredTimer", () => {
  let mockGhost;
  let mockGhosts;
  let scaredTimer;
  let mockCycleTimer;

  beforeEach(() => {
    mockGhost = {
      isScared: true,
      changeScaredState: () => undefined,
      assignSprite: () => undefined,
      checkSpeedMatchesState: () => undefined,
    };
    mockGhosts = [mockGhost, mockGhost, mockGhost, mockGhost];
    scaredTimer = new ScaredTimer(mockGhosts);
    mockCycleTimer = {
      resume: () => undefined,
    };
  });

  describe("upon instantiation", () => {
    it("has a number of instance variables", () => {
      expect(scaredTimer.timeout).toBeNull();
      expect(scaredTimer.ghosts).toEqual(mockGhosts);
      expect(scaredTimer.startTime).toBeNull();
      expect(scaredTimer.timeRemaining).toBeNull();
      expect(scaredTimer.isRunning).toBeFalsy();
      expect(scaredTimer.duration).toBe(7000);
    });
  });

  describe("start", () => {
    it("sets this.timeout to a setTimeout of the ghosts changing scared state with a seven second delay if they are scared", () => {
      const mockDateNow = 173620;
      jest.spyOn(global, "setTimeout");
      jest.spyOn(mockGhost, "changeScaredState");
      jest.spyOn(mockGhost, "assignSprite");
      jest.spyOn(mockGhost, "checkSpeedMatchesState");
      jest.spyOn(mockCycleTimer, "resume");
      scaredTimer.start(mockCycleTimer, mockDateNow);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 7000);
      expect(scaredTimer.timeout).not.toBeNull();
      expect(scaredTimer.startTime).toBe(mockDateNow);
      expect(scaredTimer.timeRemaining).toBe(7000);
      expect(scaredTimer.isRunning).toBeTruthy();
      jest.runOnlyPendingTimers();
      expect(mockGhost.changeScaredState).toHaveBeenCalledTimes(4);
      expect(mockGhost.assignSprite).toHaveBeenCalledTimes(4);
      expect(mockGhost.checkSpeedMatchesState).toHaveBeenCalledTimes(4);
      expect(mockCycleTimer.resume).toHaveBeenCalledTimes(1);
      expect(scaredTimer.isRunning).toBeFalsy();
    });
  });

  describe("pause", () => {
    it("calls clearTimeout and saves the time remaining in this.timeRemaining", () => {
      jest.spyOn(global, "clearTimeout");
      scaredTimer.startTime = 4860;
      scaredTimer.timeRemaining = 7000;
      const mockDateNow = 7180;
      scaredTimer.pause(mockDateNow);
      expect(clearTimeout).toHaveBeenCalledTimes(1);
      expect(clearTimeout).toHaveBeenCalledWith(scaredTimer.timeout);
      expect(scaredTimer.timeRemaining).toBe(4680);
    });
  });

  describe("reset", () => {
    it("calls clearTimeout on this.timeout", () => {
      jest.spyOn(global, "clearTimeout");
      scaredTimer.isRunning = true;
      scaredTimer.reset();
      expect(clearTimeout).toHaveBeenCalledTimes(1);
      expect(clearTimeout).toHaveBeenCalledWith(scaredTimer.timeout);
      expect(scaredTimer.isRunning).toBeFalsy();
    });
  });
});
