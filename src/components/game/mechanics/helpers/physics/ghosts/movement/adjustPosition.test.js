import GhostMovement from "./ghostMovement";

let shiftBeforeRetreating;
let shiftRegular;

describe("adjustPosition", () => {
  beforeEach(() => {
    shiftBeforeRetreating = jest.fn();
    shiftRegular = jest.fn();
  });

  it("calls shiftBeforeRetreating if isRetreating is true", () => {
    const ghost = { isRetreating: true };
    GhostMovement.adjustPosition(ghost, shiftBeforeRetreating, shiftRegular);
    expect(shiftBeforeRetreating).toHaveBeenCalledTimes(1);
    expect(shiftBeforeRetreating).toHaveBeenCalledWith(ghost);
  });

  it("calls shiftRegular if isRetreating is false", () => {
    const ghost = { isRetreating: false };
    GhostMovement.adjustPosition(ghost, shiftBeforeRetreating, shiftRegular);
    expect(shiftRegular).toHaveBeenCalledTimes(1);
    expect(shiftRegular).toHaveBeenCalledWith(ghost);
  });
});
