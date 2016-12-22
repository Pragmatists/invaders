(function () {
    MyGame.ExtraBonuses = function (game) {
        Phaser.Group.call(this, game);
        var collect = game.add.audio('pickup');
        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;
        this.createMultiple(1, 'star');
        this.setAll('anchor.x', 0.5);
        this.setAll('anchor.y', 0.5);
        this.setAll('outOfBoundsKill', true);
        this.setAll('checkWorldBounds', true);

        game.time.events.repeat(Phaser.Timer.SECOND * 10, 10, releaseBonus, this);

        function releaseBonus() {
            var bonus = this.getFirstExists(false);
            if (bonus) {
                bonus.body.setSize(40, 40, 0, 0);
                bonus.reset(game.world.randomX + 20, 0);
                bonus.body.velocity.y = 100 + Math.random() * 100;
            }
            bonus.collect= function(){
                collect.play("",0,0.5);
                pause(game);
                this.kill();
            }
        }

        function pause(game) {
            game.physics.arcade.isPaused = true;
            var timer = game.time.create(false);
            timer.loop(1000, function () {
                game.physics.arcade.isPaused = false;
            }, this);
            timer.start();
        }
    };

    MyGame.ExtraBonuses.prototype = Object.create(Phaser.Group.prototype);
    MyGame.ExtraBonuses.prototype.constructor = MyGame.ExtraBonuses;

})();