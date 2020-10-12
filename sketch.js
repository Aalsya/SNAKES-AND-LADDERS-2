
const ROLLSTATE = 0;
const MOVESTATE = 1;
const SNADDER = 2;
var state = ROLLSTATE;
var database, form;

var tiles = [];
var player, allPlayers, playerCount;

var rolls = [];
var index = 0;
var averageRolls = 0;
var avgP;

function setup() {
  createCanvas(600, 600);
  database = firebase.database;

  rolls[index] = 0;
  avgP = createP('');

  var resoln = 60;
  var cols = height / resoln;
  var rows = width / resoln;

  var x = 0;
  var y = (rows - 1) * resoln;
  var dir = 1;
  

  for (var i = 0; i < cols * rows; i++) {
    var tile = new Tile(x, y, resoln, i, i + 1);
    tiles.push(tile);
    x += (resoln * dir);
    if (x >= width || x <= -resoln) {
      dir *= -1;
      x += resoln * dir;
      y -= resoln;
    }
  }

//snakes
  for (var i = 0; i < 5; i++) {
    var index = floor(random(cols, tiles.length-1));
    tiles[index].snadder = -1 * floor(random(index % cols, index - 1));
  }

//ladders
  for (var i = 0; i < 5; i++) {
    var index = floor(random(0, tiles.length - cols));
    tiles[index].snadder = floor(random(cols - (index % cols), tiles.length - index - 1));
  }

  //player = new Player();
}

function draw() {
  background(50);
  frameRate(5);

  for (var tile of tiles) {
    tile.display();
  }
  for (var tile of tiles) {
    tile.showSnadders();
  }

  if (state === ROLLSTATE) {
    player.rollDice();
    rolls[index]++;
    player.showPreview();
    state = MOVESTATE;
  } else if (state === MOVESTATE) {
    player.move();
    if (player.isSnadder()) {
      state = SNADDER;
    } else {
      state = ROLLSTATE;
    }
  } else if (state === SNADDER) {
    player.moveSnadder();
    state = ROLLSTATE;
  }

  var gameover = false;
  if (player.spot >= tiles.length - 1) {
    player.spot = tiles.length - 1;
    gameover = true;
  }
  player.display();

  if (gameover) {
    player.reset();
    index++;
    rolls[index] = 0;
  }
}