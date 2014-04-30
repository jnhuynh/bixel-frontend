var PlayerPlayRoute = Ember.Route.extend({
  model: function() {
    var player = this.modelFor("player"),
        area   = player.get("area");

    if (!player) {
      this.transitionTo("player.new");
    } else if (!area) {
      this.transitionTo("player.show", player);
    }

    return player;
  },

  setupController: function(controller, player) {
    controller.set("model", player);
  },

  actions: {
    exitArea: function(area) {
      var player = this.controller.get("model");

      area.get("players").removeObject(player);
      area.set("eventName", "area/player_exit");

      area.save().then(function() {
        this.transitionTo("player.show", player);
      }.bind(this));
    },

    move: function(direction) {
      var player = this.controller.get("model"),
          x      = player.get("x"),
          y      = player.get("y");

      switch (direction) {
        case "up":
          y -= 1;
          break;
        case "down":
          y += 1;
          break;
        case "left":
          x -= 1;
          break;
        case "right":
          x += 1;
          break;
      }

      player.set("x", x);
      player.set("y", y);
      player.set("eventName", "player/move");
      player.save();
    }
  }
});

export default PlayerPlayRoute;
