import drawPacmanIcon from "./drawPacmanIcon";

let mockCtx;
let mockPosition;

describe("drawPacmanIcon", () => {
  beforeEach(() => {
    mockCtx = {
      beginPath: () => undefined,
      arc: () => undefined,
      lineTo: () => undefined,
      fillStyle: undefined,
      fill: () => undefined,
      closePath: () => undefined,
    };
    mockPosition = {
      x: 580,
      y: 15,
    };
    jest.spyOn(mockCtx, "beginPath");
    jest.spyOn(mockCtx, "arc");
    jest.spyOn(mockCtx, "lineTo");
    jest.spyOn(mockCtx, "fill");
    jest.spyOn(mockCtx, "closePath");
  });

  it("calls beginPath on ctx to begin drawing Pac-Man", () => {
    drawPacmanIcon(mockCtx, mockPosition);
    expect(mockCtx.beginPath).toHaveBeenCalledTimes(1);
  });

  it("calls arc on ctx to begin drawing Pac-Man", () => {
    drawPacmanIcon(mockCtx, mockPosition);
    expect(mockCtx.arc).toHaveBeenCalledTimes(1);
    expect(mockCtx.arc).toHaveBeenCalledWith(
      580,
      15,
      15,
      Math.PI / 4,
      (Math.PI * 7) / 4
    );
  });

  it("calls lineTo on ctx to draw Pac-Man's mouth", () => {
    drawPacmanIcon(mockCtx, mockPosition);
    expect(mockCtx.lineTo).toHaveBeenCalledTimes(1);
    expect(mockCtx.lineTo).toHaveBeenCalledWith(575, 15);
  });

  it("sets ctx fillStyle to yellow", () => {
    drawPacmanIcon(mockCtx, mockPosition);
    expect(mockCtx.fillStyle).toBe("yellow");
  });

  it("calls fill in order to colour the icon in", () => {
    drawPacmanIcon(mockCtx, mockPosition);
    expect(mockCtx.fill).toHaveBeenCalledTimes(1);
  });

  it("calls closePath on ctx to finish the drawing", () => {
    drawPacmanIcon(mockCtx, mockPosition);
    expect(mockCtx.closePath).toHaveBeenCalledTimes(1);
  });
});
