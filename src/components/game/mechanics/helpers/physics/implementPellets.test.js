import Physics from "./physics";
import PelletManager from "./pellets/pelletManager";

jest.mock("./pellets/pelletManager");

describe("implementPellets", () => {
  let pellet;
  let pellets;
  let eatenPellet;
  let eatenPellets;
  let assets;
  let ctx;
  let variables;

  beforeEach(() => {
    PelletManager.mockClear();
    pellet = { hasBeenEaten: false, draw: () => undefined };
    pellets = [pellet, pellet, pellet];
    eatenPellet = { hasBeenEaten: true, draw: () => undefined };
    eatenPellets = [eatenPellet, eatenPellet];
    assets = { props: { pellets: pellets }, characters: { pacman: "pacman" } };
    ctx = "ctx";
    variables = "variables";
    jest.spyOn(pellet, "draw");
    jest.spyOn(eatenPellet, "draw");
  });

  it("calls draw on each pellet if they have not been eaten", () => {
    Physics.implementPellets(assets, ctx, variables);
    expect(pellet.draw).toHaveBeenCalledTimes(3);
    expect(pellet.draw).toHaveBeenNthCalledWith(1, ctx);
    expect(pellet.draw).toHaveBeenNthCalledWith(2, ctx);
    expect(pellet.draw).toHaveBeenNthCalledWith(3, ctx);
  });

  it("does not call draw on each pellet if they have been eaten", () => {
    assets.props.pellets = eatenPellets;
    Physics.implementPellets(assets, ctx, variables);
    expect(pellet.draw).toHaveBeenCalledTimes(0);
  });

  it("calls eatPellet on each pellet if they have not been eaten", () => {
    Physics.implementPellets(assets, ctx, variables);
    expect(PelletManager.eatPellet).toHaveBeenCalledTimes(3);
    expect(PelletManager.eatPellet).toHaveBeenNthCalledWith(
      1,
      pellet,
      assets.characters.pacman,
      variables
    );
    expect(PelletManager.eatPellet).toHaveBeenNthCalledWith(
      1,
      pellet,
      assets.characters.pacman,
      variables
    );
    expect(PelletManager.eatPellet).toHaveBeenNthCalledWith(
      1,
      pellet,
      assets.characters.pacman,
      variables
    );
  });

  it("does not call eatPellet on each pellet if they have been eaten", () => {
    assets.props.pellets = eatenPellets;
    Physics.implementPellets(assets, ctx, variables);
    expect(PelletManager.eatPellet).toHaveBeenCalledTimes(0);
  });

  it("calls checkLevelUpCondition", () => {
    Physics.implementPellets(assets, ctx, variables);
    expect(PelletManager.checkLevelUpCondition).toHaveBeenCalledTimes(1);
    expect(PelletManager.checkLevelUpCondition).toHaveBeenCalledWith(
      assets,
      variables,
      ctx
    );
  });
});
