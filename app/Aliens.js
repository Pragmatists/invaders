var Aliens = function (game) {
    Phaser.Group.call(this, game);

    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;

    for (var x = 0; x < 10; x++) {
        this.add(new Alien(game));
    }
};

Aliens.prototype = Object.create(Phaser.Group.prototype);
Aliens.prototype.constructor = Aliens;

