class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(0.5, 1.5));
    this.life = 100;
    this.size = random(5, 10);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.mult(0.95);
    this.life -= 2;
  }
  
  show(pg) {
    pg.noStroke();
    pg.fill(80, this.life);
    pg.ellipse(this.pos.x, this.pos.y, this.size);
  }
}