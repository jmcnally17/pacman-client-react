import makeScaredTimer from "./makeScaredTimer";
import ScaredTimer from "../../models/scaredTimer";

jest.mock("../../models/scaredTimer");

describe("makeScaredTimer", () => {
  it("returns the scared timer object", () => {
    const mockGhosts = "ghosts";
    const scaredTimer = makeScaredTimer(mockGhosts);
    expect(scaredTimer).toBeInstanceOf(ScaredTimer);
  });
});
