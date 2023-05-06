import updateDisplay from "./updateDisplay";

let mockvariables;
let mockPacman;
let mockDisplayLevel;
let mockDisplayScore;
let mockDisplayLives;
let mockInfo;
let mockCtx;

describe("updateDisplay", () => {
  beforeEach(() => {
    mockvariables = "variables";
    mockPacman = "pacman";
    mockDisplayLevel = jest.fn();
    mockDisplayScore = jest.fn();
    mockDisplayLives = jest.fn();
    mockCtx = {
      clearRect: () => undefined,
      font: null,
      textBaseline: null,
    };
    mockInfo = {
      getContext: () => mockCtx,
      width: "500",
      height: "25",
    };
    jest.spyOn(document, "querySelector");
    jest.spyOn(mockInfo, "getContext");
    document.querySelector.mockReturnValue(mockInfo);
    mockInfo.getContext.mockReturnValue(mockCtx);
  });

  it("calls querySelector on the document to find the game info canvas element", () => {
    updateDisplay(
      mockvariables,
      mockPacman,
      mockDisplayLevel,
      mockDisplayScore,
      mockDisplayLives
    );
    expect(document.querySelector).toHaveBeenCalledTimes(1);
    expect(document.querySelector).toHaveBeenCalledWith("#info");
  });

  it("calls getContext of the game info object to get ctx", () => {
    updateDisplay(
      mockvariables,
      mockPacman,
      mockDisplayLevel,
      mockDisplayScore,
      mockDisplayLives
    );
    expect(mockInfo.getContext).toHaveBeenCalledTimes(1);
    expect(mockInfo.getContext).toHaveBeenCalledWith("2d");
  });

  it("calls clearRect on the game info", () => {
    jest.spyOn(mockCtx, "clearRect");
    updateDisplay(
      mockvariables,
      mockPacman,
      mockDisplayLevel,
      mockDisplayScore,
      mockDisplayLives
    );
    expect(mockCtx.clearRect).toHaveBeenCalledTimes(1);
    expect(mockCtx.clearRect).toHaveBeenCalledWith(
      0,
      0,
      mockInfo.width,
      mockInfo.height
    );
  });

  it("changes the ctx font to 20px microN56", () => {
    updateDisplay(
      mockvariables,
      mockPacman,
      mockDisplayLevel,
      mockDisplayScore,
      mockDisplayLives
    );
    expect(mockCtx.font).toBe("20px microN56");
  });

  it("changes the ctx textBaseline to middle", () => {
    updateDisplay(
      mockvariables,
      mockPacman,
      mockDisplayLevel,
      mockDisplayScore,
      mockDisplayLives
    );
    expect(mockCtx.textBaseline).toBe("middle");
  });

  it("calls displayScore to show the player's score", () => {
    updateDisplay(
      mockvariables,
      mockPacman,
      mockDisplayScore,
      mockDisplayLevel,
      mockDisplayLives
    );
    expect(mockDisplayScore).toHaveBeenCalledTimes(1);
    expect(mockDisplayScore).toHaveBeenCalledWith(mockCtx, mockvariables);
  });

  it("calls displayLevel to show the player's current level", () => {
    updateDisplay(
      mockvariables,
      mockPacman,
      mockDisplayScore,
      mockDisplayLevel,
      mockDisplayLives
    );
    expect(mockDisplayLevel).toHaveBeenCalledTimes(1);
    expect(mockDisplayLevel).toHaveBeenCalledWith(mockCtx, mockvariables);
  });

  it("calls displayLives to show the number of lives left", () => {
    updateDisplay(
      mockvariables,
      mockPacman,
      mockDisplayScore,
      mockDisplayLevel,
      mockDisplayLives
    );
    expect(mockDisplayLives).toHaveBeenCalledTimes(1);
    expect(mockDisplayLives).toHaveBeenCalledWith(mockCtx, mockPacman);
  });
});
