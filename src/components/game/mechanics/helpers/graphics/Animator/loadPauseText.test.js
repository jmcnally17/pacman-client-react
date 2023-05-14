import Animator from "./animator";

describe("loadPauseText", () => {
  it("adds the pause text image onto the screen", () => {
    const ctx = {
      globalAlpha: undefined,
      drawImage: () => undefined,
    };
    const pauseTextImage = "pauseTextImage";
    jest.spyOn(ctx, "drawImage");
    Animator.loadPauseText(ctx, pauseTextImage);
    expect(ctx.globalAlpha).toBe(1);
    expect(ctx.drawImage).toHaveBeenCalledTimes(1);
    expect(ctx.drawImage).toHaveBeenCalledWith(
      pauseTextImage,
      98,
      394,
      700,
      140
    );
  });
});
