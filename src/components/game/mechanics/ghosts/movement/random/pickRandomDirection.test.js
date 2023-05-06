import pickRandomDirection from "./pickRandomDirection";
import { mockRandom, resetMockRandom } from "jest-mock-random";

let mockGhost;
let mockPathways;

describe("pickRandomDirection", () => {
  beforeEach(() => {
    mockGhost = {
      velocity: {
        x: 0,
        y: 0,
      },
      speed: 4,
    };
    mockPathways = ["up", "down", "right", "left"];
  });

  afterEach(() => {
    resetMockRandom();
  });

  it("can start moving the ghost upwards if it is available", () => {
    mockRandom([0]);
    pickRandomDirection(mockGhost, mockPathways);
    expect(mockGhost.velocity).toEqual({
      x: 0,
      y: -4,
    });
  });

  it("can start moving the ghost downwards if it is available", () => {
    mockRandom([0.3]);
    pickRandomDirection(mockGhost, mockPathways);
    expect(mockGhost.velocity).toEqual({
      x: 0,
      y: 4,
    });
  });

  it("can start moving the ghost to the right if it is available", () => {
    mockRandom([0.6]);
    pickRandomDirection(mockGhost, mockPathways);
    expect(mockGhost.velocity).toEqual({
      x: 4,
      y: 0,
    });
  });

  it("can start moving the ghost to the left if it is available", () => {
    mockRandom([0.9]);
    pickRandomDirection(mockGhost, mockPathways);
    expect(mockGhost.velocity).toEqual({
      x: -4,
      y: 0,
    });
  });
});
