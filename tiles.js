class Tile {
  constructor(x, y, wh, index, next) {
    this.x = x;
    this.y = y;
    this.wh = wh;
    this.index = index;
    this.next = next;
    this.snadder = 0;
    if (this.index % 2 === 0) {
      this.color = 200;
    } else {
    this.color = 100;
    }
  }

  getCenter() {
    var cx = this.x + this.wh / 2;
    var cy = this.y + this.wh / 2;
    return [cx, cy];
  }

  display() {
    fill(this.color);
    strokeWeight(1);
    stroke(0);
    rect(this.x, this.y, this.wh, this.wh);
    fill(255);
    textSize(20);
    text(this.next, this.x, this.y + this.wh);
  }

  highlight() {
    fill(0, 0, 255, 100);
    noStroke();
    rect(this.x, this.y, this.wh, this.wh);
  }

  showSnadders() {
    if (this.snadder !== 0) {
      var myc = this.getCenter();
      var nxtc = tiles[this.index + this.snadder].getCenter();
      strokeWeight(4);
      stroke(255, 0, 0);
      if (this.snadder < 0) {
        stroke(255, 0, 0);
      } else {
        stroke(0, 255, 0);
      }
      line(myc[0], myc[1], nxtc[0], nxtc[1]);

    } 
  }
}