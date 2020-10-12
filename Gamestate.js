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
    if (gamestate === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Login();
      form.display();
    }
  }
}