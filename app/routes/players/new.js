var PlayersNewRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord("player");
  },

  setupController: function(controller, model) {
    controller.set("model", model);
  },

  actions: {
    createPlayer: function() {
      var model = this.controller.get("model"),
          route = this;

      model.set("eventName", "player/create");
      model.save().then(function() {
        this.transitionTo("areas.index");
      }.bind(this));
    }
  }
});

export default PlayersNewRoute;
