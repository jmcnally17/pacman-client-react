import Factory from "./factory";
import PowerUp from "../../models/powerUp";

jest.mock("../../models/powerUp");

describe("makePowerUps", () => {
  let mockVariables;

  beforeEach(() => {
    PowerUp.mockClear();
    mockVariables = {
      tileLength: 32,
    };
  });

  it("returns an empty array for a map containing no power ups", () => {
    const mockMap = [
      ["1", "-"],
      ["4", "3", "|"],
    ];
    expect(Factory.makePowerUps(mockMap, mockVariables)).toEqual([]);
  });

  it("returns the appropriate number of power up objects in an array", () => {
    const mockMap = [
      ["1", "o"],
      ["4", "3", "o"],
      ["o", "o", "-"],
    ];
    const powerUps = Factory.makePowerUps(mockMap, mockVariables);
    expect(powerUps.length).toBe(4);
    powerUps.forEach((powerUp) => expect(powerUp).toBeInstanceOf(PowerUp));
  });
});
