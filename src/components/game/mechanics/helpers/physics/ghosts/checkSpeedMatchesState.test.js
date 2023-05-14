import GhostManager from "./ghostManager";
import GhostMovement from "./movement/ghostMovement";

jest.mock("./movement/ghostMovement");

let variables;

describe("checkSpeedMatchesState", () => {
  beforeEach(() => {
    GhostMovement.mockClear();
    variables = { tileLength: 32 };
  });

  it("halves the ghosts speed and velocity if its speed is tileLength / 8 and is scared", () => {
    const ghost = {
      velocity: { x: 4, y: 0 },
      speed: 4,
      isScared: true,
      isRetreating: false,
    };
    GhostManager.checkSpeedMatchesState(
      ghost,
      variables,
      GhostMovement.adjustPosition
    );
    expect(ghost.velocity).toEqual({ x: 2, y: 0 });
    expect(ghost.speed).toBe(2);
    expect(GhostMovement.adjustPosition).toHaveBeenCalledTimes(1);
    expect(GhostMovement.adjustPosition).toHaveBeenCalledWith(ghost);
  });

  it("does not change the ghosts speed and velocity if its speed is tileLength / 8 and is not scared", () => {
    const ghost = {
      velocity: { x: 4, y: 0 },
      speed: 4,
      isScared: false,
      isRetreating: false,
    };
    GhostManager.checkSpeedMatchesState(
      ghost,
      variables,
      GhostMovement.adjustPosition
    );
    expect(ghost.velocity).toEqual({ x: 4, y: 0 });
    expect(ghost.speed).toBe(4);
    expect(GhostMovement.adjustPosition).toHaveBeenCalledTimes(0);
  });

  it("doubles the ghosts speed and velocity if its speed is tileLength / 16 and is not scared", () => {
    const ghost = {
      velocity: { x: 2, y: 0 },
      speed: 2,
      isScared: false,
      isRetreating: false,
    };
    GhostManager.checkSpeedMatchesState(
      ghost,
      variables,
      GhostMovement.adjustPosition
    );
    expect(ghost.velocity).toEqual({ x: 4, y: 0 });
    expect(ghost.speed).toBe(4);
    expect(GhostMovement.adjustPosition).toHaveBeenCalledTimes(1);
    expect(GhostMovement.adjustPosition).toHaveBeenCalledWith(ghost);
  });

  it("does not change the ghosts speed and velocity if its speed is tileLength / 16 and is scared", () => {
    const ghost = {
      velocity: { x: 2, y: 0 },
      speed: 2,
      isScared: true,
      isRetreating: false,
    };
    GhostManager.checkSpeedMatchesState(
      ghost,
      variables,
      GhostMovement.adjustPosition
    );
    expect(ghost.velocity).toEqual({ x: 2, y: 0 });
    expect(ghost.speed).toBe(2);
    expect(GhostMovement.adjustPosition).toHaveBeenCalledTimes(0);
  });

  it("quadruples the ghosts speed and velocity if its speed is tileLength / 16 and is retreating", () => {
    const ghost = {
      velocity: { x: 2, y: 0 },
      speed: 2,
      isScared: false,
      isRetreating: true,
    };
    GhostManager.checkSpeedMatchesState(
      ghost,
      variables,
      GhostMovement.adjustPosition
    );
    expect(ghost.velocity).toEqual({ x: 8, y: 0 });
    expect(ghost.speed).toBe(8);
    expect(GhostMovement.adjustPosition).toHaveBeenCalledTimes(1);
    expect(GhostMovement.adjustPosition).toHaveBeenCalledWith(ghost);
  });

  it("halves the ghosts speed and velocity if its speed is tileLength / 4 and is not retreating or scared", () => {
    const ghost = {
      velocity: { x: 8, y: 0 },
      speed: 8,
      isScared: false,
      isRetreating: false,
    };
    GhostManager.checkSpeedMatchesState(
      ghost,
      variables,
      GhostMovement.adjustPosition
    );
    expect(ghost.velocity).toEqual({ x: 4, y: 0 });
    expect(ghost.speed).toBe(4);
    expect(GhostMovement.adjustPosition).toHaveBeenCalledTimes(1);
    expect(GhostMovement.adjustPosition).toHaveBeenCalledWith(ghost);
  });

  it("does not change the ghosts speed and velocity if its speed is tileLength / 4 and is retreating", () => {
    const ghost = {
      velocity: { x: 8, y: 0 },
      speed: 8,
      isScared: false,
      isRetreating: true,
    };
    GhostManager.checkSpeedMatchesState(
      ghost,
      variables,
      GhostMovement.adjustPosition
    );
    expect(ghost.velocity).toEqual({ x: 8, y: 0 });
    expect(ghost.speed).toBe(8);
    expect(GhostMovement.adjustPosition).toHaveBeenCalledTimes(0);
  });
});
