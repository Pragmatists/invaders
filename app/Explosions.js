(function () {
    MyGame.Explosions = function (game) {
        Phaser.Group.call(this, game);

        this.smallBoomSound = game.add.audio('smallBoom');
        this.bonusBoom = game.add.audio('bonusBoom');
        this.createMultiple(10, 'kaboom');
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
        playExplosion.call(this, element);
        this.smallBoomSound.play("",0,0.5);
    };

    MyGame.Explosions.prototype.smallExplode = function (element) {
        var explosion = playExplosion.call(this, element);
        explosion.scale.setTo(0.5, 0.5);
        this.smallBoomSound.play("",0,0.5);
    };

    MyGame.Explosions.prototype.bonusExplode = function (element) {
        var explosion = playExplosion.call(this, element);
        explosion.scale.setTo(0.5, 0.5);
        this.bonusBoom.play("",0,0.5);
    };

    function playExplosion(element) {
        var explosion = this.getFirstExists(false);
        var x = Math.floor(element.body.x + element.width / 2);
        var y = Math.floor(element.body.y + element.height / 2);
        explosion.reset(x,y);
        explosion.play('kaboom', 30, false, true);
        return explosion;
    }
})();