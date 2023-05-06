import loadPauseOverlay from "./loadPauseOverlay";

let mockCtx;
let mockPauseTextImage;
let mockLoadTint;
let mockLoadPauseText;

describe("loadPauseOverlay", () => {
  beforeEach(() => {
    mockCtx = "ctx";
    mockPauseTextImage = "pauseTextImage";
    mockLoadTint = jest.fn();
    mockLoadPauseText = jest.fn();
  });

  it("calls loadPauseTint to add the black tint onto the screen", () => {
    loadPauseOverlay(
      mockCtx,
      mockPauseTextImage,
      mockLoadTint,
      mockLoadPauseText
    );
    expect(mockLoadTint).toHaveBeenCalledTimes(1);
    expect(mockLoadTint).toHaveBeenCalledWith(mockCtx);
  });

  it("calls loadPauseText to add the pause text onto the screen", () => {
    loadPauseOverlay(
      mockCtx,
      mockPauseTextImage,
      mockLoadTint,
      mockLoadPauseText
    );
    expect(mockLoadPauseText).toHaveBeenCalledTimes(1);
    expect(mockLoadPauseText).toHaveBeenCalledWith(mockCtx, mockPauseTextImage);
  });
});
