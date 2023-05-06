import displayPleaseWait from "./displayPleaseWait";

let mockCtx;
let mockLoadTint;
let mockDisplayPleaseWaitText;

describe("displayPleaseWait", () => {
  beforeEach(() => {
    mockCtx = "ctx";
    mockLoadTint = jest.fn();
    mockDisplayPleaseWaitText = jest.fn();
  });

  it("calls loadTint to darken the board", () => {
    displayPleaseWait(mockCtx, mockLoadTint, mockDisplayPleaseWaitText);
    expect(mockLoadTint).toHaveBeenCalledTimes(1);
    expect(mockLoadTint).toHaveBeenCalledWith(mockCtx);
  });

  it("calls displayPleaseWaitText", () => {
    displayPleaseWait(mockCtx, mockLoadTint, mockDisplayPleaseWaitText);
    expect(mockDisplayPleaseWaitText).toHaveBeenCalledTimes(1);
    expect(mockDisplayPleaseWaitText).toHaveBeenCalledWith(mockCtx);
  });
});
