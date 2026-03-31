class Track {
  constructor(trackImg) {
    this.trackImg = trackImg;
    this.scaleFactor = 0.2;
  }
  
  show(pg) {
    pg.push();
    pg.scale(this.scaleFactor);
    pg.imageMode(CENTER);
    pg.image(trackImg, (width/2)/this.scaleFactor, (height/2)/this.scaleFactor);
    pg.pop();
  }
}