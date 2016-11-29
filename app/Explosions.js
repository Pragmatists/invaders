var Explosions = function (game) {
    Phaser.Group.call(this, game);

    this.createMultiple(30, 'kaboom');
    this.forEach(setupExploder, game);

    function setupExploder(game) {
        game.anchor.x = 0.5;
        game.anchor.y = 0.5;
        game.animations.add('kaboom');
    }

};

Explosions.prototype = Object.create(Phaser.Group.prototype);
Explosions.prototype.constructor = Explosions;

Explosions.prototype.explode = function (element) {
    var explosion = this.getFirstExists(false);
    explosion.reset(element.body.x, element.body.y);
    explosion.play('kaboom', 30, false, true);
};