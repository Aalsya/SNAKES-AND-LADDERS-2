
const ROLLSTATE = 0;
const MOVESTATE = 1;
const SNADDER = 2;
var state = ROLLSTATE;
var database, form, gamestate, gameState;

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

  gamestate = new State();
  gamestate.readState();
  gamestate.start();
}

function draw() {
  background(50);
  frameRate(5);

  if (playerCount === 4) {
    gamestate.updateState(1);
  } 
  
  if (gameState === 1) {
    clear();
    gamestate.play();
  }

  if (gameState === 2) {
    gamestate.end();
  }

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
  //player.display();

  if (gameover) {
    player.reset();
    index++;
    rolls[index] = 0;
  }
}
