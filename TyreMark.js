class TyreMark {
  constructor(x, y, intensity) {
    this.pos = createVector(x, y);
    this.life = 255;
    this.intensity = intensity;
  }
  
  show(pg) {
    pg.stroke(0, this.life);
    pg.strokeWeight(this.intensity * 2);
    pg.point(this.pos.x, this.pos.y);
    this.life -= 2;
  }
}