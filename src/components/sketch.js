let bgCol;
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
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}

export function setup() {
  createCanvas(windowWidth, windowHeight);
  bgCol = 0;
  elves.push(
    new Elf({ x: 0, y: 0, width: width / 2, height: height / 2, color: 0 }),
    new Elf({ x: width/2, y: 0, width: width / 2, height: height / 2, color: 0 }),
    new Elf({ x: 0, y: height/2, width: width / 2, height: height / 2, color: 0 }),
    new Elf({ x: width/2, y: height/2, width: width / 2, height: height / 2, color: 0 }),
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
}

export function draw() {
  background(bgCol);
  elves.forEach((e) => e.draw());
}

export function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}