import Factory from "./factory";
import Boundary from "../../models/boundary";

jest.mock("../../models/boundary");

describe("makeBoundaries", () => {
  let mockVariables;
  let mockMakeTunnelBoundaries;

  beforeEach(() => {
    Boundary.mockClear();
    mockVariables = {
      tileLength: 32,
    };
    mockMakeTunnelBoundaries = jest.fn();
  });

  it("adds no boundaries to an empty array", () => {
    expect(
      Factory.makeBoundaries([[]], mockVariables, mockMakeTunnelBoundaries)
        .length
    ).toBe(0);
  });

  it("returns an array of appropriate boundary objects for each type of boundary", () => {
    const boundaries = Factory.makeBoundaries(
      [
        ["-", "|"],
        ["1", "2", "3", "4"],
        [".", " "],
      ],
      mockVariables,
      mockMakeTunnelBoundaries
    );
    expect(boundaries.length).toBe(6);
    boundaries.forEach((boundary) => expect(boundary).toBeInstanceOf(Boundary));
  });

  it("calls makeTunnelBoundaries to add them to the boundaries array", () => {
    Factory.makeBoundaries([[]], mockVariables, mockMakeTunnelBoundaries);
    expect(mockMakeTunnelBoundaries).toHaveBeenCalledTimes(1);
  });
});
