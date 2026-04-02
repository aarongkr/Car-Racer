export class Track {
  constructor(trackImg) {
    this.trackImg = trackImg;
    this.localScaleFactor = 1.1;
  }
  
  show(pg, scale) {
    pg.push();
    pg.imageMode(pg.CENTER);
    pg.translate(pg.width/2, pg.height/2)
    pg.scale(this.localScaleFactor * scale);
    pg.image(this.trackImg, 0, 0);
    pg.pop();
  }
}