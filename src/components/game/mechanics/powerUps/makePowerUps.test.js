import makePowerUps from "./makePowerUps";
import PowerUp from "../../models/powerUp";

jest.mock("../../models/powerUp");

let mockVariables;

describe("makePowerUps", () => {
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
    expect(makePowerUps(mockMap, mockVariables)).toEqual([]);
  });

  it("returns the appropriate number of power up objects in an array", () => {
    const mockMap = [
      ["1", "o"],
      ["4", "3", "o"],
      ["o", "o", "-"],
    ];
    const powerUps = makePowerUps(mockMap, mockVariables);
    expect(powerUps.length).toBe(4);
    powerUps.forEach((powerUp) => expect(powerUp).toBeInstanceOf(PowerUp));
  });
});
