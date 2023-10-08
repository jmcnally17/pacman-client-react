import Physics from "./physics";
import GhostManager from "./ghosts/ghostManager";
import BoundaryManager from "./boundaries/boundaryManager";

jest.mock("./ghosts/ghostManager");
jest.mock("./boundaries/boundaryManager");

describe("implementGhosts", () => {
  let ghostOne;
  let ghostsOne;
  let ghostTwo;
  let ghostsTwo;
  let assets;
  let ctx;
  let variables;

  beforeEach(() => {
    GhostManager.mockClear();
    BoundaryManager.mockClear();
    ghostOne = { update: () => undefined, prevCollisions: ["up", "down"] };
    ghostsOne = {
      red: ghostOne,
      pink: ghostOne,
      cyan: ghostOne,
      orange: ghostOne,
    };
    ghostTwo = { update: () => undefined, prevCollisions: [] };
    ghostsTwo = {
      red: ghostTwo,
      pink: ghostTwo,
      cyan: ghostTwo,
      orange: ghostTwo,
    };
    assets = {
      props: { boundaries: "boundaries" },
      characters: { ghosts: ghostsOne, pacman: "pacman" },
    };
    ctx = "ctx";
    variables = "variables";
  });

  it("calls update on each ghost", () => {
    jest.spyOn(ghostOne, "update");
    Physics.implementGhosts(assets, ctx, variables);
    expect(ghostOne.update).toHaveBeenCalledTimes(4);
    expect(ghostOne.update).toHaveBeenCalledWith(ctx);
  });

  it("calls implementTunnel on each ghost", () => {
    Physics.implementGhosts(assets, ctx, variables);
    expect(BoundaryManager.implementTunnel).toHaveBeenCalledTimes(4);
    expect(BoundaryManager.implementTunnel).toHaveBeenCalledWith(
      ghostOne,
      variables
    );
  });

  it("calls updatesCollisions on each ghost", () => {
    Physics.implementGhosts(assets, ctx, variables);
    expect(GhostManager.updateCollisions).toHaveBeenCalledTimes(4);
    expect(GhostManager.updateCollisions).toHaveBeenCalledWith(
      assets.props.boundaries,
      [],
      ghostOne
    );
  });

  it("calls chooseMovement on each ghost if the collisions array does not match the prevCollisions array in the ghost", () => {
    Physics.implementGhosts(assets, ctx, variables);
    expect(GhostManager.chooseMovement).toHaveBeenCalledTimes(4);
    expect(GhostManager.chooseMovement).toHaveBeenCalledWith(
      ghostOne,
      assets,
      [],
      variables
    );
  });

  it("does not call chooseMovement on each ghost when the collisions array is equal to the prevCollisions array", () => {
    assets.characters.ghosts = ghostsTwo;
    Physics.implementGhosts(assets, ctx, variables);
    expect(GhostManager.chooseMovement).toHaveBeenCalledTimes(0);
  });

  it("calls checkPacmanGhostCollision on each ghost", () => {
    Physics.implementGhosts(assets, ctx, variables);
    expect(GhostManager.checkPacmanGhostCollision).toHaveBeenCalledTimes(4);
    expect(GhostManager.checkPacmanGhostCollision).toHaveBeenCalledWith(
      ghostOne,
      assets,
      variables,
      ctx
    );
  });
});
