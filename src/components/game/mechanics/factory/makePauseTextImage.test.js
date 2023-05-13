import Factory from "./factory";

describe("makePauseTextImage", () => {
  it("returns the pause text image object", () => {
    const image = Factory.makePauseTextImage();
    expect(image).toBeInstanceOf(Image);
  });
});
