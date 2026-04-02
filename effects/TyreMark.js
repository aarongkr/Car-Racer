export class TyreMark {
  constructor(x, y, intensity, p) {
    this.p = p;
    this.pos = this.p.createVector(x, y);
    this.life = 255;
    this.intensity = intensity;
  }
  
  show(pg, scale, pixelSize) {
    pg.stroke(0, this.life);
    pg.strokeWeight(this.intensity * 2 * scale * pixelSize);
    pg.point(this.pos.x, this.pos.y);
    this.life -= 2;
  }
}