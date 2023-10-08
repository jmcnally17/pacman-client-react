import GhostMovement from "./ghostMovement";

describe("moveRandomly", () => {
  let ghost;
  let collisions;
  let pickRandomDirection;

  beforeEach(() => {
    ghost = {
      position: { x: 190, y: 200 },
      velocity: { x: 4, y: 0 },
      prevCollisions: [],
    };
    collisions = [];
    pickRandomDirection = jest.fn();
  });

  it("adds right to the prevCollisions array if the ghost is moving to the right", () => {
    GhostMovement.moveRandomly(ghost, collisions, pickRandomDirection);
    expect(ghost.prevCollisions).toEqual(["right"]);
  });

  it("adds left to the prevCollisions array if the ghost is moving to the left", () => {
    ghost.velocity = { x: -4, y: 0 };
    GhostMovement.moveRandomly(ghost, collisions, pickRandomDirection);
    expect(ghost.prevCollisions).toEqual(["left"]);
  });

  it("adds up to the prevCollisions array if the ghost is moving upwards", () => {
    ghost.velocity = { x: 0, y: -4 };
    GhostMovement.moveRandomly(ghost, collisions, pickRandomDirection);
    expect(ghost.prevCollisions).toEqual(["up"]);
  });

  it("adds down to the prevCollisions array if the ghost is moving downwards", () => {
    ghost.velocity = { x: 0, y: 4 };
    GhostMovement.moveRandomly(ghost, collisions, pickRandomDirection);
    expect(ghost.prevCollisions).toEqual(["down"]);
  });

  it("calls pickRandomDirection", () => {
    GhostMovement.moveRandomly(ghost, collisions, pickRandomDirection);
    expect(pickRandomDirection).toHaveBeenCalledTimes(1);
    expect(pickRandomDirection).toHaveBeenCalledWith(ghost, ["right"]);
  });
});
