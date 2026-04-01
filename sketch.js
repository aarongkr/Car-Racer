import { Car } from './objects/Car.js';
import { Track } from './objects/Track.js';
import { Particle } from './effects/Particle.js';
import { TyreMark } from './effects/TyreMark.js';
import { UI } from './ui/UI.js';
import { BASE_WIDTH, BASE_HEIGHT } from './constants.js';

const sketch = (p) => {
  let car;
  let particles = [];
  let tyreMarks = [];
  let carImg;
  let trackImg;
  let track;
  let pg;
  let pixelSize = 3;
  let scale = 1;

  p.preload = () => {
    carImg = p.loadImage('assets/Car1.png');
    trackImg = p.loadImage('assets/Track1.png');
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    pg = p.createGraphics(p.windowWidth, p.windowHeight);
    scale = Math.min(p.windowWidth / BASE_WIDTH, p.windowHeight / BASE_HEIGHT);
    car = new Car(p.width / 2, p.height / 2, carImg, particles, tyreMarks, scale, p);
    track = new Track(trackImg);
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    pg = p.createGraphics(p.windowWidth, p.windowHeight);
    scale = Math.min(p.windowWidth / BASE_WIDTH, p.windowHeight / BASE_HEIGHT);
  }

  p.draw = () => {
    pg.background(240);
    track.show(pg, scale);

    for (let i = tyreMarks.length - 1; i >= 0; i--) {
      tyreMarks[i].show(pg, scale);
    }
    car.update();
    car.show(pg, scale);

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].show(pg, scale);
      if (particles[i].life <= 0) {
        particles.splice(i, 1);
      }
    }

    let w = p.width / pixelSize;
    let h = p.height / pixelSize;
    let small = pg.get();
    small.resize(w, h);
    p.drawingContext.imageSmoothingEnabled = false;
    p.image(small, 0, 0, p.width, p.height);
  }
}

new p5(sketch);