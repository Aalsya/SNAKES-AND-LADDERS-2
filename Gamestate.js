class State {
  constructor() {

  }

  readState() {
    var read = database.ref('gameState');
    read.on("value", (data) => {
      gameState = data.val();
    });
  }

  updateState(state) {
    database.ref('/').update({
      gameState : state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Login();
      form.display();
    }

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

  play() {
    form.hide();

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

  end() {
    console.log("end");
  }
}
