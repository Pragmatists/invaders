var Alien = function (game) {
    Phaser.Sprite.call(this, game, game.world.randomX, 0, 'alien');
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.name = 'alien' + game.world.randomX.toString();
    this.checkWorldBounds = true;
    this.events.onOutOfBounds.add(resetElement, this);
    this.body.velocity.y = 25 + Math.random() * 100;


    Alien.prototype.explode = function (explosions) {
        explosions.explode(this);
        resetElement(this);
    };

    function resetElement(element) {
        element.reset(game.world.randomX, 0);
        element.body.velocity.y = 25 + Math.random() * 40;
    }

};
Alien.prototype = Object.create(Phaser.Sprite.prototype);
Alien.prototype.constructor = Alien;

