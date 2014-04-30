var PlayerShowRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor("player");
  },

  setupController: function(controller, player) {
    var areas = this.store.find("area");

    controller.set("model", player);
    controller.set("areas", areas);
  },

  actions: {
    selectArea: function(area) {
      var player = this.controller.get("model");

      area.get("players").pushObject(player);
      area.set("eventName", "area/player_enter");

      area.save().then(function() {
        this.transitionTo("player.play", player);
      }.bind(this));
    }
  }
});

export default PlayerShowRoute;

