const elves = [];

function* activeElf(count) {
  let i = 0;
  while (true) {
    yield i % count;
    i++;
  }
}

class Elf {
  constructor({ x, y, width: imgWidth, height: imgHeight, color }) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = imgWidth;
    this.height = imgHeight;
    this.baseHeight = 380;
    this.aspect = 0.6;
    this.armAngle = 0;
  }
  get scale() {
    return (this.height * height) / this.baseHeight;
  }
  draw() {
    push();
    translate(this.x * width, this.y * height);
    imageMode(CENTER);
    scale(this.scale);
    image(sprite.hat, 0, 0);
    image(sprite.body, 35, 100);
    pop();
  }
  drawArms() {
    this.drawLeftArm();
    this.drawRightArm();
  }
  drawLeftArm() {
    push();
    translate(this.x * width, this.y * height);
    scale(this.scale);
    translate(20, 0);
    image(sprite.leftArm, 0, 0);
    pop();
  }

  drawRightArm() {
    push();
    translate(this.x * width, this.y * height);
    scale(this.scale);
    angleMode(DEGREES);
    translate(-55, 42);
    rotate(this.armAngle);
    image(sprite.rightArm, -12, -20);
    pop();
  }
}

function canvasSize() {
  return min(windowWidth, windowHeight);
}

const sprite = {};

export function preload() {
  sprite.hat = loadImage('assets/hat.svg');
  sprite.body = loadImage('assets/body.svg');
  sprite.leftArm = loadImage('assets/left-hand.svg');
  sprite.rightArm = loadImage('assets/right-hand.svg');
}

export function setup() {
  const dim = canvasSize();
  createCanvas(dim, dim);
  clear();
  elves.push(
    new Elf({ x: 0.5, y: 0.5, height: 0.5 })
    // new Elf({ x: 0.65, y: 0.15, width: 0.2, height: 0.2, color: 0 }),
    // new Elf({ x: 0.15, y: 0.65, width: 0.2, height: 0.2, color: 0 }),
    // new Elf({ x: 0.65, y: 0.65, width: 0.2, height: 0.2, color: 0 })
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
  clear();
  elves.forEach((e) => e.draw());
  elves.forEach((e) => e.drawArms());
}

export function windowResized() {
  const dim = canvasSize();
  resizeCanvas(dim, dim);
}
