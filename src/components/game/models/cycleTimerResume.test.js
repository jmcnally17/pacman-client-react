import CycleTimer from "./cycleTimer";

jest.useFakeTimers();

describe("CycleTimer", () => {
  describe("resume", () => {
    it("calls setTimeout with the timeRemaining as the delay", () => {
      const mockGhost = {
        changeChasingState: () => true,
      };
      const mockGhosts = [mockGhost, mockGhost];
      jest.spyOn(mockGhost, "changeChasingState");
      const cycleTimer = new CycleTimer(mockGhosts);
      jest.spyOn(global, "setTimeout");
      cycleTimer.timeRemaining = 4820;
      const mockDateNow = 12390;
      cycleTimer.resume(mockDateNow);

      expect(cycleTimer.startTime).toBe(12390);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 4820);
      expect(cycleTimer.timeout).not.toBeNull();
      expect(cycleTimer.isRunning).toBeTruthy();

      jest.runOnlyPendingTimers();
      expect(mockGhost.changeChasingState).toHaveBeenCalledTimes(2);
      expect(setTimeout).toHaveBeenCalledTimes(2);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 7000);
    });
  });
});
