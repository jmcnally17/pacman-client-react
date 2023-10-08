import Physics from "./physics";
import PacmanManager from "./pacman/pacmanManager";
import BoundaryManager from "./boundaries/boundaryManager";

jest.mock("./pacman/pacmanManager");
jest.mock("./boundaries/boundaryManager");

describe("implementPacman", () => {
  let variables;
  let assets;
  let ctx;

  beforeEach(() => {
    PacmanManager.mockClear();
    BoundaryManager.mockClear();
    variables = {};
    assets = { characters: { pacman: { update: () => undefined } } };
    ctx = "ctx";
  });

  it("calls changeDirection", () => {
    Physics.implementPacman(variables, assets, ctx);
    expect(PacmanManager.changeDirection).toHaveBeenCalledTimes(1);
    expect(PacmanManager.changeDirection).toHaveBeenCalledWith(
      variables,
      assets
    );
  });

  it("calls checkIfPacmanIsEating", () => {
    Physics.implementPacman(variables, assets, ctx);
    expect(PacmanManager.checkIfPacmanIsEating).toHaveBeenCalledTimes(1);
    expect(PacmanManager.checkIfPacmanIsEating).toHaveBeenCalledWith(assets);
  });

  it("calls update on Pac-Man", () => {
    const pacman = assets.characters.pacman;
    jest.spyOn(pacman, "update");
    Physics.implementPacman(variables, assets, ctx);
    expect(pacman.update).toHaveBeenCalledTimes(1);
    expect(pacman.update).toHaveBeenCalledWith(ctx);
  });

  it("calls implementTunnel", () => {
    Physics.implementPacman(variables, assets, ctx);
    expect(BoundaryManager.implementTunnel).toHaveBeenCalledTimes(1);
    expect(BoundaryManager.implementTunnel).toHaveBeenCalledWith(
      assets.characters.pacman,
      variables
    );
  });
});
