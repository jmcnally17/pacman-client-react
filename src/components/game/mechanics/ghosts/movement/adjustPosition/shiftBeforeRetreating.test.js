import shiftBeforeRetreating from "./shiftBeforeRetreating";

let mockShiftLeft;
let mockShiftRight;
let mockShiftUp;
let mockShiftDown;

describe("shiftBeforeRetreating", () => {
  beforeEach(() => {
    mockShiftLeft = jest.fn();
    mockShiftRight = jest.fn();
    mockShiftUp = jest.fn();
    mockShiftDown = jest.fn();
  });

  it("calls shiftLeft when the ghost is moving to the right", () => {
    const mockGhost = {
      velocity: {
        x: 4,
      },
    };
    shiftBeforeRetreating(
      mockGhost,
      mockShiftLeft,
      mockShiftRight,
      mockShiftUp,
      mockShiftDown
    );
    expect(mockShiftLeft).toHaveBeenCalledTimes(1);
    expect(mockShiftLeft).toHaveBeenCalledWith(mockGhost);
  });

  it("calls shiftRight when the ghost is moving to the left", () => {
    const mockGhost = {
      velocity: {
        x: -4,
      },
    };
    shiftBeforeRetreating(
      mockGhost,
      mockShiftLeft,
      mockShiftRight,
      mockShiftUp,
      mockShiftDown
    );
    expect(mockShiftRight).toHaveBeenCalledTimes(1);
    expect(mockShiftRight).toHaveBeenCalledWith(mockGhost);
  });

  it("calls shiftUp when the ghost is moving downwards", () => {
    const mockGhost = {
      velocity: {
        y: 4,
      },
    };
    shiftBeforeRetreating(
      mockGhost,
      mockShiftLeft,
      mockShiftRight,
      mockShiftUp,
      mockShiftDown
    );
    expect(mockShiftUp).toHaveBeenCalledTimes(1);
    expect(mockShiftUp).toHaveBeenCalledWith(mockGhost);
  });

  it("calls shiftDown when the ghost is moving upwards", () => {
    const mockGhost = {
      velocity: {
        y: -4,
      },
    };
    shiftBeforeRetreating(
      mockGhost,
      mockShiftLeft,
      mockShiftRight,
      mockShiftUp,
      mockShiftDown
    );
    expect(mockShiftDown).toHaveBeenCalledTimes(1);
    expect(mockShiftDown).toHaveBeenCalledWith(mockGhost);
  });
});
