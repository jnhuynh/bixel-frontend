var PlayerShowRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor("player");
  },

  setupController: function(controller, player) {
    var areas = this.store.find("area");

    controller.set("model", player);
    controller.set("areas", areas);
  }
});

export default PlayerShowRoute;

