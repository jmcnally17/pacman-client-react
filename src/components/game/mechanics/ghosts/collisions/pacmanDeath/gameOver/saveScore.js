import axios from "axios";
import getBackendUrl from "./getBackendUrl";

export default async function saveScore(variables, callback = getBackendUrl) {
  const data = {
    name: variables.player.username,
    points: variables.score,
  };
  try {
    const res = await axios.post(
      callback(process.env.REACT_APP_BACKEND_URL),
      data
    );
    return `Success: ${res.data.message}`;
  } catch (err) {
    return `Error: ${err.response.statusText}`;
  }
}
