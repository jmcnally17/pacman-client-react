import BoundaryManager from "./boundaryManager";

describe("implementTunnel", () => {
  let variables;

  beforeEach(() => {
    variables = { tileLength: 20 };
  });

  it("changes the characters x position to -10 if it reaches 570", () => {
    const mockCharacter = { position: { x: 570 } };
    BoundaryManager.implementTunnel(mockCharacter, variables);
    expect(mockCharacter.position.x).toBe(-10);
  });

  it("changes the characters x position to 570 if it reaches -10", () => {
    const mockCharacter = { position: { x: -10 } };
    BoundaryManager.implementTunnel(mockCharacter, variables);
    expect(mockCharacter.position.x).toBe(570);
  });
});
