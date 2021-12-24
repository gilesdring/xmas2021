import { angleGenerator, angleAnimation } from "./animations";

export class Elf {
  constructor({ x, y, height: imgHeight, color, sprite, face }) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.height = imgHeight;
    this.baseHeight = 380;
    this.aspect = 0.6;
    this.sprite = sprite;
    this.face = face;
    this.angleGen = angleGenerator();
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
  get headAngle() {
    return this.angleGen.next().value * 10;
  }
  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    scale(this.scale);
    image(this.sprite.body, 35, 100);
    imageMode(CENTER);
    translate(100, 90);
    rotate(this.headAngle);
    push();
    scale(0.17);
    image(this.face, 0, 0);
    pop();
    image(this.sprite.hat, -35, -45);
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
    image(this.sprite.leftArm, 0, 0);
    pop();
  }

  drawRightArm() {
    push();
    scale(this.scale);
    angleMode(DEGREES);
    translate(60, 237);
    rotate(this.armAngle);
    image(this.sprite.rightArm, -15, -20);
    pop();
  }
}