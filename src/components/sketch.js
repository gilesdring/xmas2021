import { Elf } from './sprites/Elf';
import { Reindog } from './sprites/Reindog';

const elves = [];
let deer = undefined;

function* activeElf(count) {
  while (true) {
    yield Math.floor(Math.random() * count);
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
  photo.martha = loadImage('assets/m.png');
  photo.giles = loadImage('assets/g.png');
  photo.bea = loadImage('assets/b.png');
  photo.rebecca = loadImage('assets/r.png');
}

export function setup() {
  const dim = canvasSize();
  createCanvas(dim, dim);
  clear();
  elves.push(
    new Elf({ x: 0.29, y: 0.5, height: 0.3, sprite, face: photo.martha }),
    new Elf({ x: 0.43, y: 0.5, height: 0.3, sprite, face: photo.giles }),
    new Elf({ x: 0.57, y: 0.5, height: 0.3, sprite, face: photo.rebecca, faceScale: 0.2 }),
    new Elf({ x: 0.71, y: 0.5, height: 0.3, sprite, face: photo.bea })
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

