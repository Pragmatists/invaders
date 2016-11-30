(function () {
    MyGame.Explosions = function (game) {
        Phaser.Group.call(this, game);

        this.createMultiple(30, 'kaboom');
        this.forEach(setupExploder, game);

        function setupExploder(game) {
            game.anchor.x = 0.5;
            game.anchor.y = 0.5;
            game.animations.add('kaboom');
        }
    };

    MyGame.Explosions.prototype = Object.create(Phaser.Group.prototype);
    MyGame.Explosions.prototype.constructor = MyGame.Explosions;

    MyGame.Explosions.prototype.explode = function (element) {
        var explosion = this.getFirstExists(false);
        explosion.reset(element.body.x, element.body.y);
        explosion.play('kaboom', 30, false, true);
    };
})();