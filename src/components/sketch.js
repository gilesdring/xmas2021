import { Reindog } from './sprites/Reindog';

const elves = [];
let deer = undefined;

function* activeElf(count) {
  while (true) {
    yield Math.floor(Math.random() * count);
  }
}
function* angleAnimation() {
  let angle = 0;
  let frame = 0;
  while (frame < 9) {
    yield angle;
    if (frame < 6) angle-=15;
    else angle+=30;
    frame++;
  }
}

class Elf {
  constructor({ x, y, height: imgHeight, color }) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.height = imgHeight;
    this.baseHeight = 380;
    this.aspect = 0.6;
  }
  get scale() {
    return (this.height * height) / this.baseHeight;
  }
  get width() {
    return this.height * this.aspect;
  }
  get pos() {
    return {
      x: (this.x - this.width / 2) * width,
      y: (this.y - this.height / 2) * height,
    };
  }
  animate() {
    this.animation = angleAnimation();
  }
  get armAngle() {
    if (!this.animation) return 0;
    return this.animation.next().value;
  }
  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    scale(this.scale);
    image(sprite.body, 35, 100);
    image(sprite.hat, 0, 0);
    pop();
  }
  drawArms() {
    push();
    translate(this.pos.x, this.pos.y);
    this.drawLeftArm();
    this.drawRightArm();
    pop();
  }
  drawLeftArm() {
    push();
    scale(this.scale);
    translate(135, 195);
    image(sprite.leftArm, 0, 0);
    pop();
  }

  drawRightArm() {
    push();
    scale(this.scale);
    angleMode(DEGREES);
    translate(60, 237);
    rotate(this.armAngle);
    image(sprite.rightArm, -15, -20);
    pop();
  }
}

function canvasSize() {
  return min(windowWidth, windowHeight);
}

const sprite = {};
const photo = {};

export function preload() {
  sprite.hat = loadImage('assets/hat.svg');
  sprite.body = loadImage('assets/body.svg');
  sprite.leftArm = loadImage('assets/left-hand.svg');
  sprite.rightArm = loadImage('assets/right-hand.svg');
  sprite.table = loadImage('assets/table.svg');
  sprite.deerBody = loadImage('assets/deer-body.svg');
  sprite.deerAntler = loadImage('assets/deer-antlers.svg');
  sprite.deerNose = loadImage('assets/deer-nose.svg');
  photo.delia = loadImage('assets/delia.png');
}

export function setup() {
  const dim = canvasSize();
  createCanvas(dim, dim);
  clear();
  elves.push(
    new Elf({ x: 0.29, y: 0.5, height: 0.3 }),
    new Elf({ x: 0.43, y: 0.5, height: 0.3 }),
    new Elf({ x: 0.57, y: 0.5, height: 0.3 }),
    new Elf({ x: 0.71, y: 0.5, height: 0.3 })
  );
  const currentElf = activeElf(elves.length);
  const handleNote = (e) => elves[currentElf.next().value].animate();
  window.addEventListener('playnote', handleNote);
  deer = new Reindog({ x: 0.3, y: 0.8, height: 0.2, sprite, face: photo.delia });
  clear();
}
function drawTable() {
  push();
  imageMode(CENTER);
  translate(width/2, height * 0.61);
  scale(0.8 * width / sprite.table.width);
  image(sprite.table, 0, 0);
  pop();
}
export function draw() {
  clear();
  elves.forEach((e) => e.draw());
  drawTable();
  elves.forEach((e) => e.drawArms());
  deer.draw();
}

export function windowResized() {
  const dim = canvasSize();
  resizeCanvas(dim, dim);
}

