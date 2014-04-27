var GameView = Ember.View.extend({
  game:          null,
  player:        null,
  templateName:  "game",

  actions: {
    move: function() {
      var game   = this.get("game"),
          player = this.get("player");

          debugger;
    }
  }
});

export default GameView;
