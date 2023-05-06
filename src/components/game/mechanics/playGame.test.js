import playGame from "./playGame";

let mockPlayer;
let mockReactRoot;
let mockFinishSetup;
let mockImplementObjects;
let mockUpdateDisplay;
let mockManageGhostAudio;
let mockCtx;
let mockBoard;

describe("playGame", () => {
  beforeEach(() => {
    mockPlayer = {
      username: "John",
    };
    mockReactRoot = "reactRoot";
    mockFinishSetup = jest.fn();
    mockImplementObjects = jest.fn();
    mockUpdateDisplay = jest.fn();
    mockManageGhostAudio = jest.fn();
    jest.spyOn(global, "requestAnimationFrame");
    mockCtx = {
      clearRect: () => undefined,
    };
    jest.spyOn(mockCtx, "clearRect");
    mockBoard = {
      getContext: () => undefined,
      width: 896,
      height: 992,
    };
    jest.spyOn(mockBoard, "getContext");
    jest.spyOn(document, "querySelector");
    document.querySelector.mockReturnValue(mockBoard);
    mockBoard.getContext.mockReturnValue(mockCtx);
  });

  it("calls finishSetup", () => {
    playGame(
      mockPlayer,
      mockReactRoot,
      mockFinishSetup,
      mockImplementObjects,
      mockUpdateDisplay,
      mockManageGhostAudio
    );
    expect(mockFinishSetup).toHaveBeenCalledTimes(1);
  });

  it("calls requestAnimationFrame", () => {
    playGame(
      mockPlayer,
      mockReactRoot,
      mockFinishSetup,
      mockImplementObjects,
      mockUpdateDisplay,
      mockManageGhostAudio
    );
    expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
    expect(requestAnimationFrame).toHaveBeenCalledWith(playGame);
  });

  it("finds the board element and calls getContext and clearRect on it", () => {
    playGame(
      mockPlayer,
      mockReactRoot,
      mockFinishSetup,
      mockImplementObjects,
      mockUpdateDisplay,
      mockManageGhostAudio
    );
    expect(document.querySelector).toHaveBeenCalledTimes(1);
    expect(document.querySelector).toHaveBeenCalledWith("#board");
    expect(mockBoard.getContext).toHaveBeenCalledTimes(1);
    expect(mockBoard.getContext).toHaveBeenCalledWith("2d");
    expect(mockCtx.clearRect).toHaveBeenCalledTimes(1);
    expect(mockCtx.clearRect).toHaveBeenCalledWith(
      0,
      0,
      mockBoard.width,
      mockBoard.height
    );
  });

  it("calls implementObjects", () => {
    playGame(
      mockPlayer,
      mockReactRoot,
      mockFinishSetup,
      mockImplementObjects,
      mockUpdateDisplay,
      mockManageGhostAudio
    );
    expect(mockImplementObjects).toHaveBeenCalledTimes(1);
  });

  it("calls updateDisplay", () => {
    playGame(
      mockPlayer,
      mockReactRoot,
      mockFinishSetup,
      mockImplementObjects,
      mockUpdateDisplay,
      mockManageGhostAudio
    );
    expect(mockUpdateDisplay).toHaveBeenCalledTimes(1);
  });

  it("calls manageGhostAudio", () => {
    playGame(
      mockPlayer,
      mockReactRoot,
      mockFinishSetup,
      mockImplementObjects,
      mockUpdateDisplay,
      mockManageGhostAudio
    );
    expect(mockManageGhostAudio).toHaveBeenCalledTimes(1);
  });
});
