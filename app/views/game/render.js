var GameRenderView = Ember.View.extend({
  gameRenderer:  null,

  upKey:     null,
  downKey:   null,
  leftKey:   null,
  rightKey:  null,
  wKey:      null,
  sKey:      null,
  aKey:      null,
  dKey:      null,
  jKey:      null,

  preload: function () {
    return function _preload() {
      var gameRenderer = this.get('gameRenderer');

      gameRenderer.load.spritesheet('barbarian', 'assets/images/barbarian.png', 32, 48);
    }.bind(this);
  }.property(),

  create: function () {
    return function _create() {
      var gameRenderer = this.get('gameRenderer'),
          player;

      player = gameRenderer.add.sprite(0, 0, 'barbarian');
      player.animations.add('up', [0, 1, 2, 3], 10, true);
      player.animations.add('down', [4, 5, 6, 7], 10, true);
      player.animations.add('left', [8, 9, 10, 11], 10, true);
      player.animations.add('right', [12, 13, 14, 15], 10, true);
      player.animations.add('attack', [12, 13, 14, 15], 10, true);
      gameRenderer.physics.enable(player, Phaser.Physics.ARCADE);
      this.set('player', player);

      this.set('upKey', gameRenderer.input.keyboard.addKey(Phaser.Keyboard.UP));
      this.set('downKey', gameRenderer.input.keyboard.addKey(Phaser.Keyboard.DOWN));
      this.set('leftKey', gameRenderer.input.keyboard.addKey(Phaser.Keyboard.LEFT));
      this.set('rightKey', gameRenderer.input.keyboard.addKey(Phaser.Keyboard.RIGHT));

      this.set('wKey', gameRenderer.input.keyboard.addKey(Phaser.Keyboard.W));
      this.set('sKey', gameRenderer.input.keyboard.addKey(Phaser.Keyboard.S));
      this.set('aKey', gameRenderer.input.keyboard.addKey(Phaser.Keyboard.A));
      this.set('dKey', gameRenderer.input.keyboard.addKey(Phaser.Keyboard.D));
      this.set('dKey', gameRenderer.input.keyboard.addKey(Phaser.Keyboard.D));

      this.set('jKey', gameRenderer.input.keyboard.addKey(Phaser.Keyboard.J));
    }.bind(this);
  }.property(),

  updateAttack: function() {
    return function _updateAttack() {
      var gameRenderer = this.get('gameRenderer'),
          player       = this.get('player'),
          jKey         = this.get('jKey');

      if (jKey.isDown) {
        console.log('attack');
        player.animations.play('attack');
      }

    }.bind(this);
  },

  update: function () {
    return function _update() {
      var gameRenderer = this.get('gameRenderer'),
          player       = this.get('player'),
          otherPlayers = [],
          terrain      = [],
          leftKey      = this.get('leftKey'),
          rightKey     = this.get('rightKey'),
          upKey        = this.get('upKey'),
          downKey      = this.get('downKey'),
          aKey         = this.get('aKey'),
          dKey         = this.get('dKey'),
          wKey         = this.get('wKey'),
          sKey         = this.get('sKey');

      //  Reset the player, then check for movement keys
      player.body.velocity.setTo(0, 0);

      if (leftKey.isDown || aKey.isDown) {
        player.body.velocity.x = -100;
        player.animations.play('left');
      } else if (rightKey.isDown || dKey.isDown) {
        player.body.velocity.x = 100;
        player.animations.play('right');
      } else if (upKey.isDown || wKey.isDown) {
        player.body.velocity.y = -100;
        player.animations.play('up');
      } else if (downKey.isDown || sKey.isDown) {
        player.body.velocity.y = 100;
        player.animations.play('down');
      } else {
        player.animations.stop();
      }

      gameRenderer.physics.arcade.collide(player, otherPlayers, this.get('updateAttack'));
      gameRenderer.physics.arcade.collide(player, terrain, this.get('updateAttack'));
    }.bind(this);
  }.property(),

  didInsertElement: function() {
    var element    = this.$(),
        eventHooks = {
          preload: this.get('preload'),
          create: this.get('create'),
          update: this.get('update')
        };

    var gameRenderer = new Phaser.Game(800, 600, Phaser.AUTO,
      element.attr('id'), eventHooks);

    this.set('gameRenderer', gameRenderer);
  }
});

export default GameRenderView;
