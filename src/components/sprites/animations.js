export function* angleGenerator() {
  let i = 0;
  while (true) {
    yield sin(i);
    i += 10;
  }
}

export function* angleAnimation() {
  let angle = 0;
  let frame = 0;
  while (frame < 9) {
    yield angle;
    if (frame < 6) angle-=15;
    else angle+=30;
    frame++;
  }
}
