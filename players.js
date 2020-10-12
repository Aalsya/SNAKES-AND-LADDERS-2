class Player {
  constructor() {
    this.reset();

    this.name = null;
    this.index = null;
  }

  rollDice() {
    this.dice = floor(Math.round(random(1, 7)));
    this.next = this.spot + this.dice;
  }

  move() {
    this.spot = this.next;
  }


  isSnadder() {
    //this.spot += dice;
    var tile = tiles[this.spot];
    return (tile && tile.snadder !== 0);
  }

  moveSnadder() {
    var tile = tiles[this.spot];
    this.spot += tile.snadder;
  }

  showPreview() {
    var start = max(0, this.spot);
    var end = min(this.next, tiles.length - 1);
    for (var i = start; i <= end; i++) {
      tiles[i].highlight();
    }
  }

  reset() {
    this.spot = 0;
    this.roll = -1;
    this.next = 0;
  }

  display() {
    var current = tiles[this.spot];
    if (!current) {
      return;
    }
    fill(255);
    strokeWeight(1);
    stroke(0);
    var center = current.getCenter();
    ellipse(center[0], center[1], 30);
  }

  getCount() {
    var playerRef = database.ref('PlayerCount');
    playerRef.on("value", (data) => {
      playerCount = data.val();
    });
  }

  update() {
    var plrIndex = "players/player" + this.index;
    database.ref(plrIndex).set({
      name : this.name
    });
  }

  updateCount(count) {
    database.ref('/').update({
      playerCount : count
    });
  }

  static getPlayerInfo() {
    var playerInfo = database.ref('players');
    playerInfo.on("value", (data) => {
      allPlayers = data.val();
    });
  }
}