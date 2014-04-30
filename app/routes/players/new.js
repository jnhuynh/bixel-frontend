var PlayersNewRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord("player");
  },

  setupController: function(controller, model) {
    controller.set("model", model);
  },

  actions: {
    createPlayer: function() {
      var player = this.controller.get("model");

      player.set("eventName", "player/create");
      player.save().then(function() {
        var player = this.controller.get("model");

        this.transitionTo("player.show", player);
      }.bind(this));
    }
  }
});

export default PlayersNewRoute;

