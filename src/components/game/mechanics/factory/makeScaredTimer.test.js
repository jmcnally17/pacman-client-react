import Factory from "./factory";
import ScaredTimer from "../../models/scaredTimer";

jest.mock("../../models/scaredTimer");

describe("makeScaredTimer", () => {
  it("returns the scared timer object", () => {
    const mockGhosts = "ghosts";
    const scaredTimer = Factory.makeScaredTimer(mockGhosts);
    expect(scaredTimer).toBeInstanceOf(ScaredTimer);
  });
});
