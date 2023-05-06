import implementTunnel from "./implementTunnel";

let mockVariables;

describe("implementTunnel", () => {
  beforeEach(() => {
    mockVariables = {
      tileLength: 20,
    };
  });

  it("changes the characters x position to -10 if it reaches 570", () => {
    const mockCharacter = {
      position: {
        x: 570,
      },
    };
    implementTunnel(mockCharacter, mockVariables);
    expect(mockCharacter.position.x).toBe(-10);
  });

  it("changes the characters x position to 570 if it reaches -10", () => {
    const mockCharacter = {
      position: {
        x: -10,
      },
    };
    implementTunnel(mockCharacter, mockVariables);
    expect(mockCharacter.position.x).toBe(570);
  });
});
