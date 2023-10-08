import Animator from "./animator";

describe("loadPauseOverlay", () => {
  let ctx;
  let pauseTextImage;
  let loadTint;
  let loadPauseText;

  beforeEach(() => {
    ctx = "ctx";
    pauseTextImage = "pauseTextImage";
    loadTint = jest.fn();
    loadPauseText = jest.fn();
  });

  it("calls loadPauseTint to add the black tint onto the screen", () => {
    Animator.loadPauseOverlay(ctx, pauseTextImage, loadTint, loadPauseText);
    expect(loadTint).toHaveBeenCalledTimes(1);
    expect(loadTint).toHaveBeenCalledWith(ctx);
  });

  it("calls loadPauseText to add the pause text onto the screen", () => {
    Animator.loadPauseOverlay(ctx, pauseTextImage, loadTint, loadPauseText);
    expect(loadPauseText).toHaveBeenCalledTimes(1);
    expect(loadPauseText).toHaveBeenCalledWith(ctx, pauseTextImage);
  });
});
