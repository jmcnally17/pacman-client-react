export default function getBackendUrl(reactAppUrl) {
  let url;
  if (reactAppUrl) {
    url = `${reactAppUrl}/scores`;
  } else {
    url = "http://localhost:9000/scores";
  }
  return url;
}
