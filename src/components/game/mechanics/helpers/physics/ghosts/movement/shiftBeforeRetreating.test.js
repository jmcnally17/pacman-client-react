import GhostMovement from "./ghostMovement";

let shiftLeft;
let shiftRight;
let shiftUp;
let shiftDown;

describe("shiftBeforeRetreating", () => {
  beforeEach(() => {
    shiftLeft = jest.fn();
    shiftRight = jest.fn();
    shiftUp = jest.fn();
    shiftDown = jest.fn();
  });

  it("calls shiftLeft when the ghost is moving to the right", () => {
    const ghost = { velocity: { x: 4 } };
    GhostMovement.shiftBeforeRetreating(
      ghost,
      shiftLeft,
      shiftRight,
      shiftUp,
      shiftDown
    );
    expect(shiftLeft).toHaveBeenCalledTimes(1);
    expect(shiftLeft).toHaveBeenCalledWith(ghost);
  });

  it("calls shiftRight when the ghost is moving to the left", () => {
    const ghost = { velocity: { x: -4 } };
    GhostMovement.shiftBeforeRetreating(
      ghost,
      shiftLeft,
      shiftRight,
      shiftUp,
      shiftDown
    );
    expect(shiftRight).toHaveBeenCalledTimes(1);
    expect(shiftRight).toHaveBeenCalledWith(ghost);
  });

  it("calls shiftUp when the ghost is moving downwards", () => {
    const ghost = { velocity: { y: 4 } };
    GhostMovement.shiftBeforeRetreating(
      ghost,
      shiftLeft,
      shiftRight,
      shiftUp,
      shiftDown
    );
    expect(shiftUp).toHaveBeenCalledTimes(1);
    expect(shiftUp).toHaveBeenCalledWith(ghost);
  });

  it("calls shiftDown when the ghost is moving upwards", () => {
    const ghost = { velocity: { y: -4 } };
    GhostMovement.shiftBeforeRetreating(
      ghost,
      shiftLeft,
      shiftRight,
      shiftUp,
      shiftDown
    );
    expect(shiftDown).toHaveBeenCalledTimes(1);
    expect(shiftDown).toHaveBeenCalledWith(ghost);
  });
});
