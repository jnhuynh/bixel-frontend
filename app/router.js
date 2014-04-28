var Router = Ember.Router.extend({
  rootURL: ENV.rootURL,
  location: 'auto'
});

Router.map(function() {
  this.resource("players", function() {
    this.route("new");
  });

  this.route("play");
});

export default Router;
