var PlayersNewRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord("player");
  },

  setupController: function(controller, model) {
    controller.set("model", model);
  },

  actions: {
    createPlayerJoinArea: function() {
      var model = this.controller.get("model");

      model.save();
    }
  }
});

export default PlayersNewRoute;

