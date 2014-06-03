var GameRenderView = Ember.View.extend({
  gameRendererRenderer:  null,

  preload: function () {
    return function _preload() {
      var gameRenderer = this.get("gameRenderer");
    }.bind(this);
  }.property(),

  create: function () {
    return function _create() {
      var gameRenderer = this.get("gameRenderer");
    }.bind(this);
  }.property(),

  update: function () {
    return function _update() {
      var gameRenderer = this.get("gameRenderer");
    }.bind(this);
  }.property(),

  didInsertElement: function() {
    var element    = this.$(),
        eventHooks = {
            preload: this.get("preload"),
            create: this.get("create"),
            update: this.get("update")
        };

    var gameRenderer = new Phaser.Game(800, 600, Phaser.AUTO,
      element.attr("id"), eventHooks);

    this.set("gameRenderer", gameRenderer);
  }
});

export default GameRenderView;
