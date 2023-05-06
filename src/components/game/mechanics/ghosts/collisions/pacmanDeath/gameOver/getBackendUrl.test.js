import getBackendUrl from "./getBackendUrl";

describe("getBackendUrl", () => {
  it("returns the live site backend url if it exists", () => {
    const mockReactAppUrl = "https://randomsite.com";
    expect(getBackendUrl(mockReactAppUrl)).toBe(
      "https://randomsite.com/scores"
    );
  });

  it("returns the localhost url backend if the live site url does not exist", () => {
    const mockReactAppUrl = undefined;
    expect(getBackendUrl(mockReactAppUrl)).toBe("http://localhost:9000/scores");
  });
});
