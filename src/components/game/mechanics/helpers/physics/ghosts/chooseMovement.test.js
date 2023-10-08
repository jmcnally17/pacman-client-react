import GhostManager from "./ghostManager";
import GhostMovement from "./movement/ghostMovement";

jest.mock("./movement/ghostMovement");

describe("chooseMovement", () => {
  let ghost;
  let assets;
  let collisions;
  let variables;

  beforeEach(() => {
    GhostMovement.mockClear();
    ghost = {
      isScared: false,
      isRetreating: false,
      assignSprite: () => undefined,
    };
    assets = "assets";
    collisions = "collisions";
    variables = "variables";
  });

  it("calls chaseAndScatter if the ghost is not scared or retreating", () => {
    GhostManager.chooseMovement(ghost, assets, collisions, variables);
    expect(GhostMovement.chaseAndScatter).toHaveBeenCalledTimes(1);
    expect(GhostMovement.chaseAndScatter).toHaveBeenCalledWith(
      ghost,
      assets,
      collisions,
      variables
    );
  });

  it("calls moveRandomly if the ghost is scared", () => {
    ghost.isScared = true;
    GhostManager.chooseMovement(ghost, assets, collisions, variables);
    expect(GhostMovement.moveRandomly).toHaveBeenCalledTimes(1);
    expect(GhostMovement.moveRandomly).toHaveBeenCalledWith(ghost, collisions);
  });

  it("calls moveRandomly if the ghost is retreating", () => {
    ghost.isRetreating = true;
    GhostManager.chooseMovement(ghost, assets, collisions, variables);
    expect(GhostMovement.moveRandomly).toHaveBeenCalledTimes(1);
    expect(GhostMovement.moveRandomly).toHaveBeenCalledWith(ghost, collisions);
  });

  it("calls emptyPrevCollisions", () => {
    GhostManager.chooseMovement(ghost, assets, collisions, variables);
    expect(GhostMovement.emptyPrevCollisions).toHaveBeenCalledTimes(1);
    expect(GhostMovement.emptyPrevCollisions).toHaveBeenCalledWith(ghost);
  });

  it("calls assignSprite on the ghost", () => {
    jest.spyOn(ghost, "assignSprite");
    GhostManager.chooseMovement(ghost, assets, collisions, variables);
    expect(ghost.assignSprite).toHaveBeenCalledTimes(1);
  });
});
