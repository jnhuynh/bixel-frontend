import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'bixel', // TODO: loaded via config
  Resolver: Resolver
});

loadInitializers(App, 'bixel');

export default App;
