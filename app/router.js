var Router = Ember.Router.extend({
  rootURL: ENV.rootURL,
  location: 'auto'
});

Router.map(function() {
  this.resource("player", function() {
    this.route("new");
  });

  this.resource("area", function() {
    this.route("index");
  });

  this.route("play");
});

export default Router;
