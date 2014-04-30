var AreaIndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find("area");
  }
});

export default AreaIndexRoute;
