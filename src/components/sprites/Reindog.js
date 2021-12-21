export class Reindog {
  constructor({ x, y, height: imgHeight, sprite }) {
    this.x = x;
    this.y = y;
    this.height = imgHeight;
    this.baseHeight = 200;
    this.aspect = 1.5;
    console.log(sprite);
    this.sprite = sprite;
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
  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    imageMode(CORNER);
    scale(this.scale);
    image(this.sprite.deerBody, 0, 100);
    image(this.sprite.deerAntler, 80, 0);
    image(this.sprite.deerNose, 220, 80);
    pop();
  }
}