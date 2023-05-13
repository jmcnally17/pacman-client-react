import Factory from "./factory";
import Boundary from "../../models/boundary";

jest.mock("../../models/boundary");

describe("makeBoundaries", () => {
  it("adds the four tunnel boundaries to the boundaries array", () => {
    const mockBoundaries = [];
    const mockVariables = {
      tileLength: 32,
    };
    Factory.makeTunnelBoundaries(mockBoundaries, mockVariables);
    expect(mockBoundaries.length).toBe(4);
    mockBoundaries.forEach((boundary) =>
      expect(boundary).toBeInstanceOf(Boundary)
    );
  });
});
