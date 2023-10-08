import Boundary from "./boundary";

describe("Boundary", () => {
  let boundary;
  let mockRegularImage;
  let mockWhiteImage;

  beforeEach(() => {
    mockRegularImage = {
      src: "./random-source.png",
    };
    mockWhiteImage = {
      src: "./random-source-white.png",
    };
    boundary = new Boundary(
      {
        position: {
          x: 40,
          y: 100,
        },
        regularImage: mockRegularImage,
        whiteImage: mockWhiteImage,
      },
      20
    );
  });

  describe("upon instantiation", () => {
    it("has a width and height equal to the length passed in", () => {
      expect(boundary.width).toBe(20);
      expect(boundary.height).toBe(20);
    });

    it("has a position that is passed in", () => {
      expect(boundary.position).toEqual({
        x: 40,
        y: 100,
      });
    });

    it("has a regular image that is passed in", () => {
      expect(boundary.regularImage).toEqual({
        src: "./random-source.png",
      });
    });

    it("has a white image that is passed in", () => {
      expect(boundary.whiteImage).toEqual({
        src: "./random-source-white.png",
      });
    });

    it("has an image variable that is initially set to the regular image", () => {
      expect(boundary.image).toEqual({
        src: "./random-source.png",
      });
    });
  });

  describe("draw", () => {
    it("calls drawImage on ctx to draw the boundary", () => {
      const mockCtx = {
        drawImage: () => undefined,
      };
      jest.spyOn(mockCtx, "drawImage");
      boundary.draw(mockCtx);
      expect(mockCtx.drawImage).toHaveBeenCalledTimes(1);
      expect(mockCtx.drawImage).toHaveBeenCalledWith(boundary.image, 40, 100);
    });
  });

  describe("flash", () => {
    it("switches the image source between regular and white", () => {
      boundary.flash();
      expect(boundary.image).toEqual(boundary.whiteImage);

      boundary.flash();
      expect(boundary.image).toEqual(boundary.regularImage);
    });
  });
});
