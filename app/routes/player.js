var PlayerShowRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find("player", params.player_id);
  },

  setupController: function(controller, player) {
    controller.set("model", player);
  }
});

export default PlayerShowRoute;

