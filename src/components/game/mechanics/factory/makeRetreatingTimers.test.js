import Factory from "./factory";
import RetreatingTimer from "../../models/retreatingTimer";

jest.mock("../../models/retreatingTimer");

describe("makeRetreatingTimers", () => {
  it("makes each retreating timer and attaches them each to a ghost", () => {
    const mockGhostOne = {
      retreatingTimer: null,
    };
    const mockGhostTwo = {
      retreatingTimer: null,
    };
    const mockGhostThree = {
      retreatingTimer: null,
    };
    const mockGhostFour = {
      retreatingTimer: null,
    };
    const mockGhosts = [
      mockGhostOne,
      mockGhostTwo,
      mockGhostThree,
      mockGhostFour,
    ];
    const retreatingTimers = Factory.makeRetreatingTimers(mockGhosts);
    expect(retreatingTimers.length).toBe(4);
    retreatingTimers.forEach((retreatingTimer) =>
      expect(retreatingTimer).toBeInstanceOf(RetreatingTimer)
    );
    expect(mockGhostOne.retreatingTimer).toEqual(retreatingTimers[0]);
    expect(mockGhostTwo.retreatingTimer).toEqual(retreatingTimers[1]);
    expect(mockGhostThree.retreatingTimer).toEqual(retreatingTimers[2]);
    expect(mockGhostFour.retreatingTimer).toEqual(retreatingTimers[3]);
  });
});
