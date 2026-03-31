let car;
let particles = [];
let tyreMarks = [];
let carImg;

let track;

let pg;
let pixelSize = 4;

function preload() {
  carImg = loadImage('assets/Car1.png');
  trackImg = loadImage('assets/Track1.png')
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pg = createGraphics(width, height);
  car = new Car(width / 2, height / 2, carImg);
  track = new Track(trackImg);
}

function draw() {
  // Draw scene to buffer
  pg.background(240);
  track.show(pg);

  // Skid marks
  for (let i = tyreMarks.length - 1; i >= 0; i--) {
    tyreMarks[i].show(pg);

    if (tyreMarks[i].life <= 0) {
      tyreMarks.splice(i, 1);
    }
  }

  car.update();
  car.show(pg);

  // Particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show(pg);

    if (particles[i].life <= 0) {
      particles.splice(i, 1);
    }
  }

  // --- PIXELATION PASS ---

  let w = width / pixelSize;
  let h = height / pixelSize;

  let small = pg.get();
  small.resize(w, h);

  drawingContext.imageSmoothingEnabled = false;
  image(small, 0, 0, width, height);
}