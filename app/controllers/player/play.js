var PlayerPlayController = Ember.ObjectController.extend({
  otherPlayers: function() {
    var playerId     = this.get("id"),
        otherPlayers = this.get("area.players");

    if (otherPlayers) {
      return otherPlayers.filter(function(otherPlayer) {
        return otherPlayer.get("id") !== playerId;
      });
    } else {
      return [];
    }
  }.property("area.players")
});

export default PlayerPlayController;
