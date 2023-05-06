import resumeTimers from "./resumeTimers";

let mockCycleTimer;
let mockScaredTimer;
let mockRetreatingTimer;
let mockRetreatingTimers;

describe("resumeTimers", () => {
  beforeEach(() => {
    mockCycleTimer = {
      resume: () => undefined,
    };
    mockScaredTimer = {
      isRunning: false,
      resume: () => undefined,
    };
    mockRetreatingTimer = {
      isRunning: true,
      resume: () => undefined,
    };
    mockRetreatingTimers = [
      mockRetreatingTimer,
      mockRetreatingTimer,
      mockRetreatingTimer,
      mockRetreatingTimer,
    ];
    jest.spyOn(mockCycleTimer, "resume");
    jest.spyOn(mockScaredTimer, "resume");
    jest.spyOn(mockRetreatingTimer, "resume");
  });

  it("calls resume on the scared timer if it is running", () => {
    mockScaredTimer.isRunning = true;
    resumeTimers(mockCycleTimer, mockScaredTimer, mockRetreatingTimers);
    expect(mockScaredTimer.resume).toHaveBeenCalledTimes(1);
    expect(mockScaredTimer.resume).toHaveBeenCalledWith(mockCycleTimer);
  });

  it("calls resume on the cycle timer if the scared timer is not running", () => {
    resumeTimers(mockCycleTimer, mockScaredTimer, mockRetreatingTimers);
    expect(mockCycleTimer.resume).toHaveBeenCalledTimes(1);
  });

  it("calls resume on each retreating timer if they are running", () => {
    resumeTimers(mockCycleTimer, mockScaredTimer, mockRetreatingTimers);
    expect(mockRetreatingTimer.resume).toHaveBeenCalledTimes(4);
  });

  it("does not call resume on each retreating timer if they are not running", () => {
    mockRetreatingTimer.isRunning = false;
    resumeTimers(mockCycleTimer, mockScaredTimer, mockRetreatingTimers);
    expect(mockRetreatingTimer.resume).toHaveBeenCalledTimes(0);
  });
});
