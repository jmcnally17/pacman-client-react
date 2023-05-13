import Factory from "./factory";
import CycleTimer from "../../models/cycleTimer";

jest.mock("../../models/cycleTimer");

describe("makeCycleTimer", () => {
  it("returns the cycle timer object", () => {
    const mockGhosts = "ghosts";
    const cycleTimer = Factory.makeCycleTimer(mockGhosts);
    expect(cycleTimer).toBeInstanceOf(CycleTimer);
  });
});
