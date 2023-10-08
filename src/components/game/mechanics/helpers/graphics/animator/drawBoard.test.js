import Animator from "./animator";

describe("drawBoard", () => {
  let ctx;
  let boundary;
  let boundaries;
  let pellet;
  let pellets;
  let eatenPellet;
  let eatenPellets;
  let powerUp;
  let powerUps;
  let eatenPowerUp;
  let eatenPowerUps;
  let assets;

  beforeEach(() => {
    ctx = {
      clearRect: () => undefined,
    };
    boundary = {
      draw: () => undefined,
    };
    boundaries = [boundary, boundary];
    pellet = {
      hasBeenEaten: false,
      draw: () => undefined,
    };
    pellets = [pellet, pellet];
    eatenPellet = {
      hasBeenEaten: true,
      draw: () => undefined,
    };
    eatenPellets = [eatenPellet, eatenPellet];
    powerUp = {
      hasBeenEaten: false,
      update: () => undefined,
    };
    powerUps = [powerUp, powerUp];
    eatenPowerUp = {
      hasBeenEaten: true,
      update: () => undefined,
    };
    eatenPowerUps = [eatenPowerUp, eatenPowerUp];
    assets = {
      props: { boundaries: boundaries, pellets: pellets, powerUps: powerUps },
    };
  });

  it("calls clearRect on ctx", () => {
    jest.spyOn(ctx, "clearRect");
    Animator.drawBoard(ctx, assets);
    expect(ctx.clearRect).toHaveBeenCalledTimes(1);
    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 896, 992);
  });

  it("calls draw on each boundary", () => {
    jest.spyOn(boundary, "draw");
    Animator.drawBoard(ctx, assets);
    expect(boundary.draw).toHaveBeenCalledTimes(2);
    expect(boundary.draw).toHaveBeenNthCalledWith(1, ctx);
    expect(boundary.draw).toHaveBeenNthCalledWith(2, ctx);
  });

  it("calls draw on each pellet if they have not been eaten", () => {
    jest.spyOn(pellet, "draw");
    Animator.drawBoard(ctx, assets);
    expect(pellet.draw).toHaveBeenCalledTimes(2);
    expect(pellet.draw).toHaveBeenNthCalledWith(1, ctx);
    expect(pellet.draw).toHaveBeenNthCalledWith(2, ctx);
  });

  it("does not call draw on each pellet if they have been eaten", () => {
    jest.spyOn(eatenPellet, "draw");
    assets.props.pellets = eatenPellets;
    Animator.drawBoard(ctx, assets);
    expect(eatenPellet.draw).toHaveBeenCalledTimes(0);
  });

  it("calls update on each power up if they have not been eaten", () => {
    jest.spyOn(powerUp, "update");
    Animator.drawBoard(ctx, assets);
    expect(powerUp.update).toHaveBeenCalledTimes(2);
    expect(powerUp.update).toHaveBeenNthCalledWith(1, ctx);
    expect(powerUp.update).toHaveBeenNthCalledWith(2, ctx);
  });

  it("does not call update on each power up if they have been eaten", () => {
    jest.spyOn(eatenPowerUp, "update");
    assets.props.powerUps = eatenPowerUps;
    Animator.drawBoard(ctx, assets);
    expect(eatenPowerUp.update).toHaveBeenCalledTimes(0);
  });
});
