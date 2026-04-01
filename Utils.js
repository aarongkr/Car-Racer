export function angleDifference(a, b, p) {
  let diff = b - a;
  return p.atan2(p.sin(diff), p.cos(diff));
}