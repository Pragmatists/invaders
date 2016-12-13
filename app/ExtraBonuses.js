(function () {
    MyGame.ExtraBonuses = function (game) {
        Phaser.Group.call(this, game);

        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;
        this.createMultiple(1, 'star');
        this.setAll('scale.x', 0.3);
        this.setAll('scale.y', 0.3);        
        this.setAll('anchor.x', 0.5);
        this.setAll('anchor.y', 0.5);
        this.setAll('outOfBoundsKill', true);
        this.setAll('checkWorldBounds', true);

        game.time.events.repeat(Phaser.Timer.SECOND * 10, 10, releaseBonus, this);

        function releaseBonus() {
            var bonus = this.getFirstExists(false);
            //TODO play music when releasing bonus
            if (bonus) {
                bonus.reset(game.world.randomX + 20, 0);
                bonus.body.velocity.y = 25 + Math.random() * 200;
            }
        }
    };

    MyGame.ExtraBonuses.prototype = Object.create(Phaser.Group.prototype);
    MyGame.ExtraBonuses.prototype.constructor = MyGame.ExtraBonuses;

})();