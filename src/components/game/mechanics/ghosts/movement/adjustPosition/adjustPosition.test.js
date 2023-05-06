import adjustPosition from "./adjustPosition";

let mockShiftBeforeRetreating;
let mockShiftRegular;

describe("adjustPosition", () => {
  beforeEach(() => {
    mockShiftBeforeRetreating = jest.fn();
    mockShiftRegular = jest.fn();
  });

  it("calls shiftBeforeRetreating if isRetreating is true", () => {
    const mockGhost = {
      isRetreating: true,
    };
    adjustPosition(mockGhost, mockShiftBeforeRetreating, mockShiftRegular);
    expect(mockShiftBeforeRetreating).toHaveBeenCalledTimes(1);
    expect(mockShiftBeforeRetreating).toHaveBeenCalledWith(mockGhost);
  });

  it("calls shiftRegular if isRetreating is false", () => {
    const mockGhost = {
      isRetreating: false,
    };
    adjustPosition(mockGhost, mockShiftBeforeRetreating, mockShiftRegular);
    expect(mockShiftRegular).toHaveBeenCalledTimes(1);
    expect(mockShiftRegular).toHaveBeenCalledWith(mockGhost);
  });
});
