import ScaredTimer from "./scaredTimer";

jest.useFakeTimers();

describe("ScaredTimer", () => {
  describe("resume", () => {
    it("starts the timeout again to not change the ghosts scared state if they are not scared and resume the cycleTimer", () => {
      const mockGhost = {
        isScared: false,
        changeScaredState: () => undefined,
        assignSprite: () => undefined,
        checkSpeedMatchesState: () => undefined,
      };
      const mockGhosts = [mockGhost, mockGhost, mockGhost, mockGhost];
      const scaredTimer = new ScaredTimer(mockGhosts);
      const mockCycleTimer = { resume: () => undefined };
      jest.spyOn(global, "setTimeout");
      jest.spyOn(mockGhost, "changeScaredState");
      jest.spyOn(mockGhost, "assignSprite");
      jest.spyOn(mockGhost, "checkSpeedMatchesState");
      jest.spyOn(mockCycleTimer, "resume");
      scaredTimer.timeRemaining = 4160;
      scaredTimer.isRunning = true;
      const mockDateNow = 14290;
      scaredTimer.resume(mockCycleTimer, mockDateNow);
      expect(scaredTimer.startTime).toBe(14290);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 4160);
      expect(scaredTimer.timeout).not.toBeNull();
      jest.runOnlyPendingTimers();
      expect(mockGhost.changeScaredState).toHaveBeenCalledTimes(0);
      expect(mockGhost.assignSprite).toHaveBeenCalledTimes(0);
      expect(mockGhost.checkSpeedMatchesState).toHaveBeenCalledTimes(0);
      expect(mockCycleTimer.resume).toHaveBeenCalledTimes(1);
      expect(scaredTimer.isRunning).toBeFalsy();
    });
  });
});
