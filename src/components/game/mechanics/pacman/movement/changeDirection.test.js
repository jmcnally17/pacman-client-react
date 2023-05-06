import changeDirection from "./changeDirection";

let mockPacman;
let mockBoundaries;
let mockCheckDirectionChange;

describe("changeDirection", () => {
  beforeEach(() => {
    mockPacman = {
      speed: 5,
    };
    mockBoundaries = "boundaries";
    mockCheckDirectionChange = jest.fn();
  });

  it("calls checkDirectionChange if the last key pressed is up", () => {
    const mockVariables = {
      lastKeyPressed: "up",
    };
    changeDirection(
      mockVariables,
      mockPacman,
      mockBoundaries,
      mockCheckDirectionChange
    );
    expect(mockCheckDirectionChange).toHaveBeenCalledTimes(1);
    expect(mockCheckDirectionChange).toHaveBeenCalledWith(
      mockPacman,
      mockBoundaries,
      {
        velocity: {
          x: 0,
          y: -5,
        },
      }
    );
  });

  it("calls checkDirectionChange if the last key pressed is down", () => {
    const mockVariables = {
      lastKeyPressed: "down",
    };
    changeDirection(
      mockVariables,
      mockPacman,
      mockBoundaries,
      mockCheckDirectionChange
    );
    expect(mockCheckDirectionChange).toHaveBeenCalledTimes(1);
    expect(mockCheckDirectionChange).toHaveBeenCalledWith(
      mockPacman,
      mockBoundaries,
      {
        velocity: {
          x: 0,
          y: 5,
        },
      }
    );
  });

  it("calls checkDirectionChange if the last key pressed is right", () => {
    const mockVariables = {
      lastKeyPressed: "right",
    };
    changeDirection(
      mockVariables,
      mockPacman,
      mockBoundaries,
      mockCheckDirectionChange
    );
    expect(mockCheckDirectionChange).toHaveBeenCalledTimes(1);
    expect(mockCheckDirectionChange).toHaveBeenCalledWith(
      mockPacman,
      mockBoundaries,
      {
        velocity: {
          x: 5,
          y: 0,
        },
      }
    );
  });

  it("calls checkDirectionChange if the last key pressed is left", () => {
    const mockVariables = {
      lastKeyPressed: "left",
    };
    changeDirection(
      mockVariables,
      mockPacman,
      mockBoundaries,
      mockCheckDirectionChange
    );
    expect(mockCheckDirectionChange).toHaveBeenCalledTimes(1);
    expect(mockCheckDirectionChange).toHaveBeenCalledWith(
      mockPacman,
      mockBoundaries,
      {
        velocity: {
          x: -5,
          y: 0,
        },
      }
    );
  });

  it("does not call checkDirectionChange if the last key pressed is empty", () => {
    const mockVariables = {
      lastKeyPressed: "",
    };
    changeDirection(
      mockVariables,
      mockPacman,
      mockBoundaries,
      mockCheckDirectionChange
    );
    expect(mockCheckDirectionChange).toHaveBeenCalledTimes(0);
  });
});
