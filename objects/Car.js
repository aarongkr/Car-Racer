class Car {
  constructor(x, y, carImg) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.angle = 0;

    this.acceleration = 0.25; // 0.025
    this.maxSpeed = 5; // 1.5
    this.grip = 0.05; // 0.025
    this.turnSpeed = 0.075; // 0.025
    
    this.wheelBase = 20;
    this.trackWidth = 14;
    
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
    let target = createVector(mouseX, mouseY);
    let desired = p5.Vector.sub(target, this.pos);
    let desiredAngle = desired.heading();

    let angleDiff = angleDifference(this.angle, desiredAngle);
    this.angle += constrain(angleDiff, -this.turnSpeed, this.turnSpeed);

    let forward = p5.Vector.fromAngle(this.angle);
    forward.mult(this.acceleration);
    this.vel.add(forward);

    this.vel.limit(this.maxSpeed);

    let forwardVel = p5.Vector.fromAngle(this.angle).mult(this.vel.dot(p5.Vector.fromAngle(this.angle)));
    let right = p5.Vector.fromAngle(this.angle + HALF_PI);
    let sidewaysVel = right.mult(this.vel.dot(right));

    sidewaysVel.mult(1 - this.grip);

    this.vel = p5.Vector.add(forwardVel, sidewaysVel);

    let driftAmount = sidewaysVel.mag();

    if (driftAmount > 0.9) {
      this.spawnEffects(driftAmount);
    }

    this.pos.add(this.vel);

    this.pos.x = (this.pos.x + width) % width;
    this.pos.y = (this.pos.y + height) % height;
  }
  
  getRearWheelPositions() {
    let forward = p5.Vector.fromAngle(this.angle);
    let right = p5.Vector.fromAngle(this.angle + HALF_PI);

    let rearCenter = p5.Vector.sub(
      this.pos,
      p5.Vector.mult(forward, this.wheelBase)
    );

    let leftWheel = p5.Vector.add(
      rearCenter,
      p5.Vector.mult(right, -this.trackWidth / 2)
    );

    let rightWheel = p5.Vector.add(
      rearCenter,
      p5.Vector.mult(right, this.trackWidth / 2)
    );

    return { leftWheel, rightWheel };
  }

  spawnEffects(amount) {
    let { leftWheel, rightWheel } = this.getRearWheelPositions();

    for (let i = 0; i < 2; i++) {
      particles.push(new Particle(leftWheel.x, leftWheel.y));
      particles.push(new Particle(rightWheel.x, rightWheel.y));
    }

    tyreMarks.push(new TyreMark(leftWheel.x, leftWheel.y, amount));
    tyreMarks.push(new TyreMark(rightWheel.x, rightWheel.y, amount));
  }

  show(pg) {
    pg.push();
    pg.translate(this.pos.x, this.pos.y);
    pg.rotate(this.angle + HALF_PI);
    pg.imageMode(CENTER);
    pg.scale(0.4);
    pg.fill(0);
    pg.image(this.carImg, 0, 0);
    pg.pop();
  }
}