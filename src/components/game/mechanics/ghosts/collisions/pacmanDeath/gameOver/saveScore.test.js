import mockAxios from "jest-mock-axios";
import saveScore from "./saveScore";

let mockVariables;
let mockGetBackendUrl;

describe("saveScore", () => {
  beforeEach(() => {
    mockVariables = {
      player: {
        username: "person",
      },
      score: 0,
    };
    mockGetBackendUrl = jest
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
    const response = await saveScore(mockVariables, mockGetBackendUrl);
    expect(response).toBe("Success: your score has been saved");
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      "https://livesite.com/backend",
      {
        name: "person",
        points: 0,
      }
    );
    expect(mockGetBackendUrl).toHaveBeenCalledTimes(1);
  });

  it("returns an error when the axios post request fails", async () => {
    mockAxios.post.mockRejectedValueOnce({
      response: {
        statusText: "API is down",
      },
    });
    const response = await saveScore(mockVariables, mockGetBackendUrl);
    expect(response).toBe("Error: API is down");
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      "https://livesite.com/backend",
      {
        name: "person",
        points: 0,
      }
    );
    expect(mockGetBackendUrl).toHaveBeenCalledTimes(1);
  });
});
