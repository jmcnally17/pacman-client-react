import BoundaryManager from "./boundaryManager";

describe("stopPacmanCollision", () => {
  it("changes Pac-Man's velocity to 0 in both directions when colliding with a boundary", () => {
    const pacman = {
      position: { x: 200, y: 200 },
      velocity: { x: 5, y: 5 },
      radius: 40,
    };
    const boundary = { position: { x: 200, y: 200 }, height: 50, width: 50 };
    BoundaryManager.stopPacmanCollision(boundary, pacman);
    expect(pacman.velocity).toEqual({ x: 0, y: 0 });
  });

  it("leaves Pac-Man's velocity unchanged when not colliding with a boundary", () => {
    const pacman = {
      position: { x: 350, y: 40 },
      velocity: { x: 5, y: 5 },
      radius: 10,
    };
    const boundary = { position: { x: 200, y: 200 }, height: 10, width: 10 };
    BoundaryManager.stopPacmanCollision(boundary, pacman);
    expect(pacman.velocity).toEqual({ x: 5, y: 5 });
  });
});
