import drawBoard from "./drawBoard";

let mockCtx;
let mockBoundary;
let mockBoundaries;
let mockPellet;
let mockPellets;
let mockEatenPellet;
let mockEatenPellets;
let mockPowerUp;
let mockPowerUps;
let mockEatenPowerUp;
let mockEatenPowerUps;

describe("drawBoard", () => {
  beforeEach(() => {
    mockCtx = {
      clearRect: () => undefined,
    };
    mockBoundary = {
      draw: () => undefined,
    };
    mockBoundaries = [mockBoundary, mockBoundary];
    mockPellet = {
      hasBeenEaten: false,
      draw: () => undefined,
    };
    mockPellets = [mockPellet, mockPellet];
    mockEatenPellet = {
      hasBeenEaten: true,
      draw: () => undefined,
    };
    mockEatenPellets = [mockEatenPellet, mockEatenPellet];
    mockPowerUp = {
      hasBeenEaten: false,
      update: () => undefined,
    };
    mockPowerUps = [mockPowerUp, mockPowerUp];
    mockEatenPowerUp = {
      hasBeenEaten: true,
      update: () => undefined,
    };
    mockEatenPowerUps = [mockEatenPowerUp, mockEatenPowerUp];
  });

  it("calls clearRect on ctx", () => {
    jest.spyOn(mockCtx, "clearRect");
    drawBoard(mockCtx, mockBoundaries, mockPellets, mockPowerUps);
    expect(mockCtx.clearRect).toHaveBeenCalledTimes(1);
    expect(mockCtx.clearRect).toHaveBeenCalledWith(0, 0, 896, 992);
  });

  it("calls draw on each boundary", () => {
    jest.spyOn(mockBoundary, "draw");
    drawBoard(mockCtx, mockBoundaries, mockPellets, mockPowerUps);
    expect(mockBoundary.draw).toHaveBeenCalledTimes(2);
    expect(mockBoundary.draw).toHaveBeenNthCalledWith(1, mockCtx);
    expect(mockBoundary.draw).toHaveBeenNthCalledWith(2, mockCtx);
  });

  it("calls draw on each pellet if they have not been eaten", () => {
    jest.spyOn(mockPellet, "draw");
    drawBoard(mockCtx, mockBoundaries, mockPellets, mockPowerUps);
    expect(mockPellet.draw).toHaveBeenCalledTimes(2);
    expect(mockPellet.draw).toHaveBeenNthCalledWith(1, mockCtx);
    expect(mockPellet.draw).toHaveBeenNthCalledWith(2, mockCtx);
  });

  it("does not call draw on each pellet if they have been eaten", () => {
    jest.spyOn(mockEatenPellet, "draw");
    drawBoard(mockCtx, mockBoundaries, mockEatenPellets, mockPowerUps);
    expect(mockEatenPellet.draw).toHaveBeenCalledTimes(0);
  });

  it("calls update on each power up if they have not been eaten", () => {
    jest.spyOn(mockPowerUp, "update");
    drawBoard(mockCtx, mockBoundaries, mockPellets, mockPowerUps);
    expect(mockPowerUp.update).toHaveBeenCalledTimes(2);
    expect(mockPowerUp.update).toHaveBeenNthCalledWith(1, mockCtx);
    expect(mockPowerUp.update).toHaveBeenNthCalledWith(2, mockCtx);
  });

  it("does not call update on each power up if they have been eaten", () => {
    jest.spyOn(mockEatenPowerUp, "update");
    drawBoard(mockCtx, mockBoundaries, mockPellets, mockEatenPowerUps);
    expect(mockEatenPowerUp.update).toHaveBeenCalledTimes(0);
  });
});
