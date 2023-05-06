import scatter from "./scatter";

let mockPathway;
let mockFindRedScatterPath;
let mockFindPinkScatterPath;
let mockFindCyanScatterPath;
let mockFindOrangeScatterPath;

describe("scatter", () => {
  beforeEach(() => {
    mockPathway = "pathway";
    mockFindRedScatterPath = jest.fn();
    mockFindPinkScatterPath = jest.fn();
    mockFindCyanScatterPath = jest.fn();
    mockFindOrangeScatterPath = jest.fn();
  });

  it("calls findRedScatterPath if the ghost is red", () => {
    const mockRedGhost = {
      colour: "red",
    };
    scatter(
      mockRedGhost,
      mockPathway,
      mockFindRedScatterPath,
      mockFindPinkScatterPath,
      mockFindCyanScatterPath,
      mockFindOrangeScatterPath
    );
    expect(mockFindRedScatterPath).toHaveBeenCalledTimes(1);
    expect(mockFindRedScatterPath).toHaveBeenCalledWith(mockPathway);
  });

  it("calls findPinkScatterPath if the ghost is pink", () => {
    const mockPinkGhost = {
      colour: "pink",
    };
    scatter(
      mockPinkGhost,
      mockPathway,
      mockFindRedScatterPath,
      mockFindPinkScatterPath,
      mockFindCyanScatterPath,
      mockFindOrangeScatterPath
    );
    expect(mockFindPinkScatterPath).toHaveBeenCalledTimes(1);
    expect(mockFindPinkScatterPath).toHaveBeenCalledWith(mockPathway);
  });

  it("calls findCyanScatterPath if the ghost is cyan", () => {
    const mockCyanGhost = {
      colour: "cyan",
    };
    scatter(
      mockCyanGhost,
      mockPathway,
      mockFindRedScatterPath,
      mockFindPinkScatterPath,
      mockFindCyanScatterPath,
      mockFindOrangeScatterPath
    );
    expect(mockFindCyanScatterPath).toHaveBeenCalledTimes(1);
    expect(mockFindCyanScatterPath).toHaveBeenCalledWith(mockPathway);
  });

  it("calls findOrangeScatterPath if the ghost is orange", () => {
    const mockOrangeGhost = {
      colour: "orange",
    };
    scatter(
      mockOrangeGhost,
      mockPathway,
      mockFindRedScatterPath,
      mockFindPinkScatterPath,
      mockFindCyanScatterPath,
      mockFindOrangeScatterPath
    );
    expect(mockFindOrangeScatterPath).toHaveBeenCalledTimes(1);
    expect(mockFindOrangeScatterPath).toHaveBeenCalledWith(mockPathway);
  });
});
