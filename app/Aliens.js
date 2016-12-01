(function () {
    MyGame.Aliens = function (game) {
        Phaser.Group.call(this, game);

        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;

        for (var x = 0; x < 10; x++) {
            this.add(new MyGame.Alien(game,x));
        }
    };

    MyGame.Aliens.prototype = Object.create(Phaser.Group.prototype);
    MyGame.Aliens.prototype.constructor = MyGame.Aliens;

    MyGame.Aliens.prototype.explode= function(){
        this.forEach(function (alien) {
            alien.explode();
        });
    }


})();