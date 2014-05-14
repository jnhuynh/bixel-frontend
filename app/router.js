var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
  this.resource("players", function() {
    this.route("new");
  });

  this.resource("player", { path: "player/:player_id" }, function() {
    this.route("show");
    this.route("play");
  });

  this.resource("areas", function() {
  });
});

export default Router;
