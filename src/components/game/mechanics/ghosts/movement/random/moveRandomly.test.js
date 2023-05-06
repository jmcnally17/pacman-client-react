import moveRandomly from "./moveRandomly";

let mockGhost;
let collisions;
let mockPickRandomDirection;
let mockEmptyPrevCollisions;

describe("moveRandomly", () => {
  beforeEach(() => {
    mockGhost = {
      position: {
        x: 190,
        y: 200,
      },
      velocity: {
        x: 4,
        y: 0,
      },
      prevCollisions: [],
    };
    collisions = [];
    mockPickRandomDirection = jest.fn();
    mockEmptyPrevCollisions = jest.fn();
  });

  it("adds right to the prevCollisions array if the ghost is moving to the right", () => {
    moveRandomly(
      mockGhost,
      collisions,
      mockPickRandomDirection,
      mockEmptyPrevCollisions
    );
    expect(mockGhost.prevCollisions).toEqual(["right"]);
  });

  it("adds left to the prevCollisions array if the ghost is moving to the left", () => {
    mockGhost.velocity = {
      x: -4,
      y: 0,
    };
    moveRandomly(
      mockGhost,
      collisions,
      mockPickRandomDirection,
      mockEmptyPrevCollisions
    );
    expect(mockGhost.prevCollisions).toEqual(["left"]);
  });

  it("adds up to the prevCollisions array if the ghost is moving upwards", () => {
    mockGhost.velocity = {
      x: 0,
      y: -4,
    };
    moveRandomly(
      mockGhost,
      collisions,
      mockPickRandomDirection,
      mockEmptyPrevCollisions
    );
    expect(mockGhost.prevCollisions).toEqual(["up"]);
  });

  it("adds down to the prevCollisions array if the ghost is moving downwards", () => {
    mockGhost.velocity = {
      x: 0,
      y: 4,
    };
    moveRandomly(
      mockGhost,
      collisions,
      mockPickRandomDirection,
      mockEmptyPrevCollisions
    );
    expect(mockGhost.prevCollisions).toEqual(["down"]);
  });

  it("calls pickRandomDirection", () => {
    moveRandomly(
      mockGhost,
      collisions,
      mockPickRandomDirection,
      mockEmptyPrevCollisions
    );
    expect(mockPickRandomDirection).toHaveBeenCalledTimes(1);
    expect(mockPickRandomDirection).toHaveBeenCalledWith(mockGhost, ["right"]);
  });

  it("calls emptyPrevCollisions", () => {
    moveRandomly(
      mockGhost,
      collisions,
      mockPickRandomDirection,
      mockEmptyPrevCollisions
    );
    expect(mockEmptyPrevCollisions).toHaveBeenCalledTimes(1);
    expect(mockEmptyPrevCollisions).toHaveBeenCalledWith(mockGhost);
  });
});
