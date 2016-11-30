(function () {
    MyGame.ExtraBonuses = function (game) {
        Phaser.Group.call(this, game);

        var x = Math.random() * (game.world.width - 50);
        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;
        this.createMultiple(30, 'star');
        this.setAll('anchor.x', 0.5);
        this.setAll('anchor.y', 1);
        this.setAll('outOfBoundsKill', true);
        this.setAll('checkWorldBounds', true);

        game.time.events.repeat(Phaser.Timer.SECOND * 10, 10, releaseBonus, this);

        function releaseBonus() {
            var bonus = this.getFirstExists(false);
            if (bonus) {
                bonus.reset(game.world.randomX + 20, 0);
                bonus.body.velocity.y = 25 + Math.random() * 50;
            }
        }
    };

    MyGame.ExtraBonuses.prototype = Object.create(Phaser.Group.prototype);
    MyGame.ExtraBonuses.prototype.constructor = MyGame.ExtraBonuses;

})();