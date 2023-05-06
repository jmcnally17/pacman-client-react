import stopPacmanCollision from "./stopPacmanCollision";

describe("stopPacmanCollision", () => {
  it("changes Pac-Man's velocity to 0 in both directions when colliding with a boundary", () => {
    const mockPacman = {
      position: {
        x: 200,
        y: 200,
      },
      velocity: {
        x: 5,
        y: 5,
      },
      radius: 40,
    };
    const mockBoundary = {
      position: {
        x: 200,
        y: 200,
      },
      height: 50,
      width: 50,
    };
    stopPacmanCollision(mockBoundary, mockPacman);
    expect(mockPacman.velocity).toEqual({
      x: 0,
      y: 0,
    });
  });

  it("leaves Pac-Man's velocity unchanged when not colliding with a boundary", () => {
    const mockPacman = {
      position: {
        x: 350,
        y: 40,
      },
      velocity: {
        x: 5,
        y: 5,
      },
      radius: 10,
    };
    const mockBoundary = {
      position: {
        x: 200,
        y: 200,
      },
      height: 10,
      width: 10,
    };
    stopPacmanCollision(mockBoundary, mockPacman);
    expect(mockPacman.velocity).toEqual({
      x: 5,
      y: 5,
    });
  });
});
