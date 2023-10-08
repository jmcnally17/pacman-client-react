import ScaredTimer from "./scaredTimer";

jest.useFakeTimers();

describe("ScaredTimer", () => {
  describe("start", () => {
    it("does not call changeScaredState in the timeout if the ghosts are not scared", () => {
      const mockGhost = {
        isScared: false,
        changeScaredState: () => undefined,
        assignSprite: () => undefined,
        checkSpeedMatchesState: () => undefined,
      };
      const mockGhosts = [mockGhost, mockGhost, mockGhost, mockGhost];
      const scaredTimer = new ScaredTimer(mockGhosts);
      const mockCycleTimer = { resume: () => undefined };
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
      expect(mockGhost.changeScaredState).toHaveBeenCalledTimes(0);
      expect(mockGhost.assignSprite).toHaveBeenCalledTimes(0);
      expect(mockGhost.checkSpeedMatchesState).toHaveBeenCalledTimes(0);
      expect(mockCycleTimer.resume).toHaveBeenCalledTimes(1);
      expect(scaredTimer.isRunning).toBeFalsy();
    });
  });
});
