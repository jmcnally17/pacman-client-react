import implementPacman from "./implementPacman";

let mockVariables;
let mockPacman;
let mockBoundaries;
let mockCtx;
let mockPellets;
let mockChangeDirection;
let mockCheckIfPacmanIsEating;
let mockImplementTunnel;

describe("implementPacman", () => {
  beforeEach(() => {
    mockVariables = {};
    mockPacman = {
      update: () => undefined,
    };
    mockBoundaries = "boundaries";
    mockCtx = "ctx";
    mockPellets = "pellets";
    mockChangeDirection = jest.fn();
    mockCheckIfPacmanIsEating = jest.fn();
    mockImplementTunnel = jest.fn();
  });

  it("calls changeDirection", () => {
    implementPacman(
      mockVariables,
      mockPacman,
      mockBoundaries,
      mockCtx,
      mockPellets,
      mockChangeDirection,
      mockCheckIfPacmanIsEating,
      mockImplementTunnel
    );
    expect(mockChangeDirection).toHaveBeenCalledTimes(1);
    expect(mockChangeDirection).toHaveBeenCalledWith(
      mockVariables,
      mockPacman,
      mockBoundaries
    );
  });

  it("calls checkIfPacmanIsEating", () => {
    implementPacman(
      mockVariables,
      mockPacman,
      mockBoundaries,
      mockCtx,
      mockPellets,
      mockChangeDirection,
      mockCheckIfPacmanIsEating,
      mockImplementTunnel
    );
    expect(mockCheckIfPacmanIsEating).toHaveBeenCalledTimes(1);
    expect(mockCheckIfPacmanIsEating).toHaveBeenCalledWith(
      mockPellets,
      mockPacman
    );
  });

  it("calls update on Pac-Man", () => {
    jest.spyOn(mockPacman, "update");
    implementPacman(
      mockVariables,
      mockPacman,
      mockBoundaries,
      mockCtx,
      mockPellets,
      mockChangeDirection,
      mockCheckIfPacmanIsEating,
      mockImplementTunnel
    );
    expect(mockPacman.update).toHaveBeenCalledTimes(1);
    expect(mockPacman.update).toHaveBeenCalledWith(mockCtx);
  });

  it("calls implementTunnel", () => {
    implementPacman(
      mockVariables,
      mockPacman,
      mockBoundaries,
      mockCtx,
      mockPellets,
      mockChangeDirection,
      mockCheckIfPacmanIsEating,
      mockImplementTunnel
    );
    expect(mockImplementTunnel).toHaveBeenCalledTimes(1);
    expect(mockImplementTunnel).toHaveBeenCalledWith(mockPacman, mockVariables);
  });
});
