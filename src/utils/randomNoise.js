export default function randomNoise (noise) {
  return Math.random() * ((0 + noise / 2) - (0 - noise / 2)) + (0 - noise / 2)
}
