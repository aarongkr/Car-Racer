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
  let pixelSize = 5;
  let scale = 1;

  p.preload = () => {
    carImg = p.loadImage('assets/Car1.png');
    trackImg = p.loadImage('assets/Track1.png');
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth/pixelSize, p.windowHeight/pixelSize);
    scale = Math.min(p.windowWidth / BASE_WIDTH, p.windowHeight / BASE_HEIGHT) / pixelSize;
    car = new Car(p.width / 2, p.height / 2, carImg, particles, tyreMarks, scale, p);
    track = new Track(trackImg);
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth/pixelSize, p.windowHeight/pixelSize);
    scale = Math.min(p.windowWidth/BASE_WIDTH, p.windowHeight/BASE_HEIGHT) / pixelSize;
    car.onResize(scale);
  }

  p.draw = () => {
    p.background(240);
    track.show(p, scale);

    for (let i = tyreMarks.length - 1; i >= 0; i--) {
      tyreMarks[i].show(p, scale, pixelSize);
      if (tyreMarks[i].life <= 0) {
        tyreMarks.splice(i, 1);
      }
    }
    car.update(pixelSize);
    car.show(p, scale);

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].show(p, scale);
      if (particles[i].life <= 0) {
        particles.splice(i, 1);
      }
    }
  }
}

new p5(sketch);