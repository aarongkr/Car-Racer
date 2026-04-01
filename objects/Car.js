import { angleDifference } from "../Utils.js";
import { Particle } from "../effects/Particle.js";
import { TyreMark } from "../effects/TyreMark.js"

export class Car {
  constructor(x, y, carImg, particles, tyreMarks, scale, p) {
    this.p = p;
    this.scale = scale;
    this.particles = particles;
    this.tyreMarks = tyreMarks;

    this.pos = this.p.createVector(x, y);
    this.vel = this.p.createVector(0, 0);
    this.angle = 0;

    this.acceleration = 0.25*scale; // 0.025
    this.maxSpeed = 5*scale; // 1.5
    this.grip = 0.05*scale; // 0.025
    this.turnSpeed = 0.075*scale; // 0.025
    
    this.wheelBase = 20*scale;
    this.trackWidth = 14*scale;
    
    this.carImg = carImg;
    
    this.fuelCap = 100;
    this.fuel = this.fuelCap;
    this.fuelConsumption = 1;
    
    this.tireCap = 100;
    this.tires = this.tireCap;
    this.tireConsumption = 1;
    
    this.durabilityCap = 100;
    this.durability = this.durabilityCap;
  }

  update() {
    let target = this.p.createVector(this.p.mouseX, this.p.mouseY);
    let desired = target.copy().sub(this.pos);
    let desiredAngle = desired.heading();

    let angleDiff = angleDifference(this.angle, desiredAngle, this.p);
    this.angle += this.p.constrain(angleDiff, -this.turnSpeed, this.turnSpeed);

    let forward = this.p.createVector(this.p.cos(this.angle), this.p.sin(this.angle));
    forward.mult(this.acceleration);
    this.vel.add(forward);

    this.vel.limit(this.maxSpeed);

    let forwardDir = this.p.createVector(this.p.cos(this.angle), this.p.sin(this.angle));
    let forwardVel = forwardDir.copy().mult(this.vel.dot(forwardDir));
    
    let right = this.p.createVector(this.p.cos(this.angle + this.p.HALF_PI), this.p.sin(this.angle + this.p.HALF_PI));
    let sidewaysVel = right.copy().mult(this.vel.dot(right));

    sidewaysVel.mult(1 - this.grip);

    this.vel = forwardVel.copy().add(sidewaysVel);

    let driftAmount = sidewaysVel.mag();

    if (driftAmount > 0.9) {
      this.spawnEffects(driftAmount);
    }

    this.pos.add(this.vel);

    this.pos.x = (this.pos.x + this.p.width) % this.p.width;
    this.pos.y = (this.pos.y + this.p.height) % this.p.height;
  }
  
  getRearWheelPositions() {
    let forward = this.p.createVector(this.p.cos(this.angle), this.p.sin(this.angle));
    let right = this.p.createVector(this.p.cos(this.angle + this.p.HALF_PI), this.p.sin(this.angle + this.p.HALF_PI));

    let rearCenter = this.pos.copy().sub(forward.copy().mult(this.wheelBase));

    let leftWheel = rearCenter.copy().add(right.copy().mult(-this.trackWidth));

    let rightWheel = rearCenter.copy().add(right.copy().mult(this.trackWidth));

    return { leftWheel, rightWheel };
  }

  spawnEffects(amount) {
    let { leftWheel, rightWheel } = this.getRearWheelPositions();

    for (let i = 0; i < 2; i++) {
      this.particles.push(new Particle(leftWheel.x, leftWheel.y, this.p));
      this.particles.push(new Particle(rightWheel.x, rightWheel.y, this.p));
    }

    this.tyreMarks.push(new TyreMark(leftWheel.x, leftWheel.y, amount, this.p));
    this.tyreMarks.push(new TyreMark(rightWheel.x, rightWheel.y, amount, this.p));
  }

  show(pg, scale) {
    pg.push();
    pg.translate(this.pos.x, this.pos.y);
    pg.rotate(this.angle + this.p.HALF_PI);
    pg.imageMode(pg.CENTER);
    pg.scale(0.4*scale);
    pg.image(this.carImg, 0, 0);
    pg.pop();
  }
}