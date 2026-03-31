function angleDifference(a, b) {
  let diff = b - a;
  return atan2(sin(diff), cos(diff));
}