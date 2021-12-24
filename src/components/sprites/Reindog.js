export function* angleGenerator() {
  let i = 0;
  while(true) {
    yield sin(i);
    i+=10;
  }
}

export class Reindog {
  constructor({ x, y, height: imgHeight, sprite, face }) {
    this.x = x;
    this.y = y;
    this.height = imgHeight;
    this.baseHeight = 200;
    this.aspect = 1.5;
    this.sprite = sprite;
    this.face = face;
    this.angleGen = angleGenerator();
  }
  get scale() {
    return (this.height * height) / this.baseHeight
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
  get headAngle() {
    return (this.angleGen.next().value) * 10;
  }
  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    imageMode(CORNER);
    scale(this.scale);
    image(this.sprite.deerBody, 0, 100);

    translate(160, 100)
    rotate(this.headAngle);
    image(this.sprite.deerAntler, -75, -100);
    push();
    imageMode(CENTER);
    scale(0.16);
    image(this.face, 0, 0);
    pop();
    image(this.sprite.deerNose, -5, 5);
    pop();
  }
}