var AreaRoute = Ember.Route.extend({
  model: function() {
    return this.store.find("area");
  },

  setupController: function(controller, model) {

  }
});

export default AreaRoute;

