import emptyPrevCollisions from "./emptyPrevCollisions";

describe("emptyPrevCollisions", () => {
  it("empties the prevCollisions array on the ghost", () => {
    const mockGhost = {
      prevCollisions: ["up", "down"],
    };
    emptyPrevCollisions(mockGhost);
    expect(mockGhost.prevCollisions).toEqual([]);
  });
});
