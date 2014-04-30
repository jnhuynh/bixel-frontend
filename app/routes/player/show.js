var PlayerShowRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find("player", params.id);
  },

  setupController: function(controller, player) {
    var areas = this.store.find("area");

    controller.set("model", player);
    controller.set("areas", areas);
  }
});

export default PlayerShowRoute;

