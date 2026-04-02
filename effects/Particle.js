export class Particle {
  constructor(x, y, p) {
    this.p = p;
    this.pos = this.p.createVector(x, y);
    this.vel = this.p.createVector(this.p.random(-1, 1), this.p.random(-1, 1));
    this.vel.normalize();
    this.vel.mult(this.p.random(0.1, 0.2));
    this.life = 100;
    this.size = this.p.random(5, 10);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.mult(0.95);
    this.life -= 2;
  }
  
  show(pg, scale) {
    pg.noStroke();
    pg.fill(50, this.life);
    pg.ellipse(this.pos.x, this.pos.y, this.size*scale);
  }
}