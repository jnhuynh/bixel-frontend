var PlayersNewRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord("player");
  },

  setupController: function(controller, model) {
    controller.set("model", model);
  },

  actions: {
    createPlayer: function() {
      var model = this.controller.get("model");

      model.set("eventName", "player/create");
      model.save().then(function() {
        var model = this.controller.get("model");

        this.transitionTo("player.show", model);
      }.bind(this));
    }
  }
});

export default PlayersNewRoute;

