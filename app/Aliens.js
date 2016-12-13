(function () {
    MyGame.Aliens = function (game) {
        Phaser.Group.call(this, game);

        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;

        for (var alienNo = 0; alienNo < 5; alienNo++) {
            var position = game.world.width * (alienNo / 5);
            this.add(new MyGame.Alien(game, position));
        }
    };

    MyGame.Aliens.prototype = Object.create(Phaser.Group.prototype);
    MyGame.Aliens.prototype.constructor = MyGame.Aliens;

    MyGame.Aliens.prototype.explode = function () {
        this.forEach(function (alien) {
            alien.explode();
        });
    }


})();