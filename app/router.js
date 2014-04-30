var Router = Ember.Router.extend({
  rootURL: ENV.rootURL,
  location: 'auto'
});

Router.map(function() {
  this.resource("players", function() {
    this.route("new");
  });

  this.resource("player", { path: "player/:player_id" }, function() {
    this.route("show");
  });

  this.resource("areas", function() {
  });

  this.route("play");
});

export default Router;
