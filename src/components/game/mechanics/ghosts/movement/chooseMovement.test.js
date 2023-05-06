import chooseMovement from "./chooseMovement";

let mockPacman;
let mockCollisions;
let mockVariables;
let mockRedGhost;
let mockchaseAndScatter;
let mockMoveRandomly;

describe("chooseMovement", () => {
  beforeEach(() => {
    mockPacman = "pacman";
    mockCollisions = "collisions";
    mockVariables = "variables";
    mockRedGhost = "redGhost";
    mockchaseAndScatter = jest.fn();
    mockMoveRandomly = jest.fn();
  });

  it("calls chaseAndScatter if the ghost is not scared or retreating", () => {
    const mockGhost = {
      isScared: false,
      isRetreating: false,
    };
    chooseMovement(
      mockGhost,
      mockPacman,
      mockCollisions,
      mockVariables,
      mockRedGhost,
      mockchaseAndScatter,
      mockMoveRandomly
    );
    expect(mockchaseAndScatter).toHaveBeenCalledTimes(1);
    expect(mockchaseAndScatter).toHaveBeenCalledWith(
      mockGhost,
      mockPacman,
      mockCollisions,
      mockVariables,
      mockRedGhost
    );
  });

  it("calls randomDirection if the ghost is scared", () => {
    const mockGhost = {
      isScared: true,
    };
    chooseMovement(
      mockGhost,
      mockPacman,
      mockCollisions,
      mockVariables,
      mockRedGhost,
      mockchaseAndScatter,
      mockMoveRandomly
    );
    expect(mockMoveRandomly).toHaveBeenCalledTimes(1);
    expect(mockMoveRandomly).toHaveBeenCalledWith(mockGhost, mockCollisions);
  });

  it("calls randomDirection if the ghost is retreating", () => {
    const mockGhost = {
      isScared: false,
      isRetreating: true,
    };
    chooseMovement(
      mockGhost,
      mockPacman,
      mockCollisions,
      mockVariables,
      mockRedGhost,
      mockchaseAndScatter,
      mockMoveRandomly
    );
    expect(mockMoveRandomly).toHaveBeenCalledTimes(1);
    expect(mockMoveRandomly).toHaveBeenCalledWith(mockGhost, mockCollisions);
  });
});
