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

  setupController: function(model) {

  }
});

export default PlayerPlayRoute;
