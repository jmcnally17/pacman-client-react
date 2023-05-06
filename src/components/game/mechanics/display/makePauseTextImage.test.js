import makePauseTextImage from "./makePauseTextImage";

describe("makePauseTextImage", () => {
  it("returns the pause text image object", () => {
    const image = makePauseTextImage();
    expect(image).toBeInstanceOf(Image);
  });
});
