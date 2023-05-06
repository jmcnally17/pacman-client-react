export default function calculateHypotenuse(vector, pathway) {
  pathway.distance = Math.hypot(vector.x, vector.y);
}
