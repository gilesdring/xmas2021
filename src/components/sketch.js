const elves = [];

function* activeElf(count) {
  let i = 0;
  while (true) {
    yield i % count;
    i++;
  }
}

class Elf {
  constructor({ x, y, width, height, color }) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    push();
    noStroke();
    fill(this.color);
    rect(
      this.x * width,
      this.y * height,
      this.width * width,
      this.height * height,
    );
    pop();
  }
}

function canvasSize() {
  return min(windowWidth, windowHeight);
}

export function setup() {
  const dim = canvasSize();
  createCanvas(dim, dim);
  clear();
  elves.push(
    new Elf({ x: 0.15, y: 0.15, width: 0.2, height: 0.2, color: 0 }),
    new Elf({ x: 0.65, y: 0.15, width: 0.2, height: 0.2, color: 0 }),
    new Elf({ x: 0.15, y: 0.65, width: 0.2, height: 0.2, color: 0 }),
    new Elf({ x: 0.65, y: 0.65, width: 0.2, height: 0.2, color: 0 })
  );
  const currentElf = activeElf(elves.length);
  const handleNote = (e) => {
    elves[currentElf.next().value].color = color(
      random(255),
      random(255),
      random(255)
    );
  };
  window.addEventListener('playnote', handleNote);
  clear();
}

export function draw() {
  elves.forEach((e) => e.draw());
}

export function windowResized() {
  const dim = canvasSize();
  resizeCanvas(dim, dim);
}
