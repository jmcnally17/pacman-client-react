import CycleTimer from "./cycleTimer";

jest.useFakeTimers();

describe("CycleTimer", () => {
  let cycleTimer;
  let mockGhost;
  let mockGhosts;

  beforeEach(() => {
    mockGhost = {
      changeChasingState: () => true,
    };
    mockGhosts = [mockGhost, mockGhost];
    jest.spyOn(mockGhost, "changeChasingState");
    cycleTimer = new CycleTimer(mockGhosts);
  });

  describe("upon instantiation", () => {
    it("has a number of instance variables", () => {
      expect(cycleTimer.timeout).toBeNull();
      expect(cycleTimer.ghosts).toEqual(mockGhosts);
      expect(cycleTimer.count).toBe(0);
      expect(cycleTimer.startTime).toBeNull();
      expect(cycleTimer.timeRemaining).toBeNull();
      expect(cycleTimer.isRunning).toBeFalsy();
    });
  });

  describe("start", () => {
    it("begins the timeout with a delay of seven seconds if the count is equal to 1", () => {
      const mockDateNow = 16940;
      jest.spyOn(global, "setTimeout");
      cycleTimer.start(mockDateNow);

      expect(cycleTimer.startTime).toBe(16940);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 7000);
      expect(cycleTimer.timeout).not.toBeNull();
      expect(cycleTimer.count).toBe(1);
      expect(cycleTimer.timeRemaining).toBe(7000);
      expect(cycleTimer.isRunning).toBeTruthy();

      jest.runOnlyPendingTimers();
      expect(mockGhost.changeChasingState).toHaveBeenCalledTimes(2);
      expect(setTimeout).toHaveBeenCalledTimes(2);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 20000);
    });
  });

  describe("pause", () => {
    it("calls clearTimeout and saves the time remaining in this.timeRemaining", () => {
      jest.spyOn(global, "clearTimeout");
      cycleTimer.startTime = 2460;
      cycleTimer.timeRemaining = 7000;
      cycleTimer.isRunning = true;
      const mockDateNow = 5780;
      cycleTimer.pause(mockDateNow);
      expect(clearTimeout).toHaveBeenCalledTimes(1);
      expect(clearTimeout).toHaveBeenCalledWith(cycleTimer.timeout);
      expect(cycleTimer.timeRemaining).toBe(3680);
      expect(cycleTimer.isRunning).toBeFalsy();
    });
  });

  describe("reset", () => {
    it("clears the timeout and sets the count back to 0", () => {
      jest.spyOn(global, "clearTimeout");
      cycleTimer.count = 1;
      cycleTimer.isRunning = true;
      cycleTimer.reset();
      expect(clearTimeout).toHaveBeenCalledTimes(1);
      expect(clearTimeout).toHaveBeenCalledWith(cycleTimer.timeout);
      expect(cycleTimer.count).toBe(0);
      expect(cycleTimer.isRunning).toBeFalsy();
    });
  });
});
