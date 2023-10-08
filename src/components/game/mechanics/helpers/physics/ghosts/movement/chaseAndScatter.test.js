import GhostMovement from "./ghostMovement";

describe("chaseAndScatter", () => {
  let ghost;
  let assets;
  let collisions;
  let variables;
  let mockCalculateDistance;
  let mockpickDirection;

  beforeEach(() => {
    ghost = {
      position: { x: 190, y: 200 },
      velocity: { x: 4, y: 0 },
      prevCollisions: [],
    };
    assets = "assets";
    collisions = [];
    variables = "variables";
    mockCalculateDistance = jest.fn();
    mockpickDirection = jest.fn();
  });

  it("adds right to the prevCollisions array if the ghost is moving to the right", () => {
    GhostMovement.chaseAndScatter(
      ghost,
      assets,
      collisions,
      variables,
      mockCalculateDistance,
      mockpickDirection
    );
    expect(ghost.prevCollisions).toEqual(["right"]);
  });

  it("adds left to the prevCollisions array if the ghost is moving to the left", () => {
    ghost.velocity = { x: -4, y: 0 };
    GhostMovement.chaseAndScatter(
      ghost,
      assets,
      collisions,
      variables,
      mockCalculateDistance,
      mockpickDirection
    );
    expect(ghost.prevCollisions).toEqual(["left"]);
  });

  it("adds up to the prevCollisions array if the ghost is moving upwards", () => {
    ghost.velocity = { x: 0, y: -4 };
    GhostMovement.chaseAndScatter(
      ghost,
      assets,
      collisions,
      variables,
      mockCalculateDistance,
      mockpickDirection
    );
    expect(ghost.prevCollisions).toEqual(["up"]);
  });

  it("adds down to the prevCollisions array if the ghost is moving downwards", () => {
    ghost.velocity = { x: 0, y: 4 };
    GhostMovement.chaseAndScatter(
      ghost,
      assets,
      collisions,
      variables,
      mockCalculateDistance,
      mockpickDirection
    );
    expect(ghost.prevCollisions).toEqual(["down"]);
  });

  it("calls calculateDistance", () => {
    GhostMovement.chaseAndScatter(
      ghost,
      assets,
      collisions,
      variables,
      mockCalculateDistance,
      mockpickDirection
    );
    expect(mockCalculateDistance).toHaveBeenCalledTimes(1);
    expect(mockCalculateDistance).toHaveBeenCalledWith(
      assets,
      ghost,
      [{ direction: "right" }],
      variables
    );
  });

  it("calls pickDirection", () => {
    GhostMovement.chaseAndScatter(
      ghost,
      assets,
      collisions,
      variables,
      mockCalculateDistance,
      mockpickDirection
    );
    expect(mockpickDirection).toHaveBeenCalledTimes(1);
    expect(mockpickDirection).toHaveBeenCalledWith(
      [{ direction: "right" }],
      ghost
    );
  });
});
