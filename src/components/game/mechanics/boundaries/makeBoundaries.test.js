import makeBoundaries from "./makeBoundaries";
import Boundary from "../../models/boundary";

jest.mock("../../models/boundary");

let mockVariables;
let mockMakeTunnelBoundaries;

describe("makeBoundaries", () => {
  beforeEach(() => {
    Boundary.mockClear();
    mockVariables = {
      tileLength: 32,
    };
    mockMakeTunnelBoundaries = jest.fn();
  });

  it("adds no boundaries to an empty array", () => {
    expect(
      makeBoundaries([[]], mockVariables, mockMakeTunnelBoundaries).length
    ).toBe(0);
  });

  it("returns an array of appropriate boundary objects for each type of boundary", () => {
    const boundaries = makeBoundaries(
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
    makeBoundaries([[]], mockVariables, mockMakeTunnelBoundaries);
    expect(mockMakeTunnelBoundaries).toHaveBeenCalledTimes(1);
  });
});
