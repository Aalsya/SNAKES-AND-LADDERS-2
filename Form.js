class Login {
  constructor() {
    this.input = createInput("Name");
    this.play = createButton('PLAY');
    this.heading = createElement('h1');
    this.welcome = createElement('h3');
  }

  hide() {
    this.input.hide();
    this.play.hide();
    this.welcome.hide();
  }

  display() {
    var title = createElement('h1');
    title.html("SNAKES AND LADDERS");
    title.position(width/2 - 200, 100);

    this.input.position(width/2 - 100, height/2);

    this.play.position(width/2 - 100, height/2 + 100);
    this.play.mousePressed(() => {
      hide();
      player.name = this.input.value();
      playerCount++;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.welcome.html("HELLO " + player.name);
      this.welcome.position(width/2 - 100, height/2 + 300);
    });
  }
}