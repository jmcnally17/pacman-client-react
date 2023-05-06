import loadPauseText from "./loadPauseText";

describe("loadPauseText", () => {
  it("adds the pause text image onto the screen", () => {
    const mockCtx = {
      globalAlpha: undefined,
      drawImage: () => undefined,
    };
    const mockPauseTextImage = "pauseTextImage";
    jest.spyOn(mockCtx, "drawImage");
    loadPauseText(mockCtx, mockPauseTextImage);
    expect(mockCtx.globalAlpha).toBe(1);
    expect(mockCtx.drawImage).toHaveBeenCalledTimes(1);
    expect(mockCtx.drawImage).toHaveBeenCalledWith(
      mockPauseTextImage,
      98,
      394,
      700,
      140
    );
  });
});
