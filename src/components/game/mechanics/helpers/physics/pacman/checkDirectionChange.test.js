import PacmanManager from "./pacmanManager";
import BoundaryManager from "../boundaries/boundaryManager";

jest.mock("../boundaries/boundaryManager");

describe("checkDirectionChange", () => {
  let pacman;
  let boundaryOne;
  let boundaryTwo;
  let boundaries;
  let velocity;

  beforeEach(() => {
    BoundaryManager.mockClear();
    pacman = { velocity: { x: 20, y: 5 } };
    boundaryOne = "boundaryOne";
    boundaryTwo = "boundaryTwo";
    boundaries = [boundaryOne, boundaryTwo];
    velocity = { velocity: { x: -5, y: 0 } };
  });

  it("calls hitBoundaryConditional for each boundary", () => {
    PacmanManager.checkDirectionChange(pacman, boundaries, velocity);
    expect(BoundaryManager.hitBoundaryConditional).toHaveBeenCalledTimes(2);
    expect(BoundaryManager.hitBoundaryConditional).toHaveBeenNthCalledWith(
      1,
      pacman,
      boundaryOne,
      { velocity: { x: -5, y: 0 } }
    );
    expect(BoundaryManager.hitBoundaryConditional).toHaveBeenNthCalledWith(
      2,
      pacman,
      boundaryTwo,
      { velocity: { x: -5, y: 0 } }
    );
  });

  it("changes Pac-Man's velocity when he will not collide with any boundaries", () => {
    BoundaryManager.hitBoundaryConditional.mockReturnValue(false);
    PacmanManager.checkDirectionChange(pacman, boundaries, velocity);
    expect(pacman.velocity).toEqual({ x: -5, y: 0 });
  });

  it("leaves Pac-Man's velocity unchanged when he will collide with any boundaries", () => {
    BoundaryManager.hitBoundaryConditional.mockReturnValue(true);
    PacmanManager.checkDirectionChange(pacman, boundaries, velocity);
    expect(pacman.velocity).toEqual({ x: 20, y: 5 });
  });
});
