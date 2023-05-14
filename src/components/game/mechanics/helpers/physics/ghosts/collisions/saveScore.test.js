import GhostCollision from "./ghostCollision";
import mockAxios from "jest-mock-axios";

let variables;
let getBackendUrl;

describe("saveScore", () => {
  beforeEach(() => {
    variables = {
      player: { username: "person" },
      score: 0,
    };
    getBackendUrl = jest
      .fn()
      .mockReturnValueOnce("https://livesite.com/backend");
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it("calls post on axios to make a POST request to save the score to the database", async () => {
    mockAxios.post.mockResolvedValueOnce({
      data: { message: "your score has been saved" },
    });
    const response = await GhostCollision.saveScore(variables, getBackendUrl);
    expect(response).toBe("Success: your score has been saved");
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      "https://livesite.com/backend",
      { name: "person", points: 0 }
    );
    expect(getBackendUrl).toHaveBeenCalledTimes(1);
  });

  it("returns an error when the axios post request fails", async () => {
    mockAxios.post.mockRejectedValueOnce({
      response: { statusText: "API is down" },
    });
    const response = await GhostCollision.saveScore(variables, getBackendUrl);
    expect(response).toBe("Error: API is down");
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      "https://livesite.com/backend",
      { name: "person", points: 0 }
    );
    expect(getBackendUrl).toHaveBeenCalledTimes(1);
  });
});
