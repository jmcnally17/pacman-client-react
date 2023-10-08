import EventListener from "./eventListener";

describe("addDirectionDetection", () => {
  let variables;

  beforeEach(() => {
    variables = {
      lastKeyPressed: "",
      directionEventListener: null,
    };
  });

  it("sets the directionEventListener key in the variables object to the arrow function that defines the event listener", () => {
    EventListener.addDirectionDetection(variables);
    expect(variables.directionEventListener).toEqual(expect.any(Function));
  });

  describe("adds an event listener to", () => {
    it("set the key to up when the ArrowUp key is pressed", () => {
      const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
      EventListener.addDirectionDetection(variables);
      window.dispatchEvent(event);
      expect(variables.lastKeyPressed).toBe("up");
    });

    it("set the last key pressed to left when the ArrowLeft key is pressed", () => {
      const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
      EventListener.addDirectionDetection(variables);
      window.dispatchEvent(event);
      expect(variables.lastKeyPressed).toBe("left");
    });

    it("set the last key pressed to right when the ArrowRight key is pressed", () => {
      const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
      EventListener.addDirectionDetection(variables);
      window.dispatchEvent(event);
      expect(variables.lastKeyPressed).toBe("right");
    });

    it("set the last key pressed to down when the ArrowDown key is pressed", () => {
      const event = new KeyboardEvent("keydown", { key: "ArrowDown" });
      EventListener.addDirectionDetection(variables);
      window.dispatchEvent(event);
      expect(variables.lastKeyPressed).toBe("down");
    });
  });
});
