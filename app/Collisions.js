(function () {

    MyGame.Collisions = function (game, aliens) {


        this.update = function (player, bonuses, extraBonuses, aliens) {
            game.physics.arcade.overlap(aliens, player, alienCollision, null, this);
            game.physics.arcade.overlap(bonuses, player, bonusPlayerCollision, null, this);
            game.physics.arcade.overlap(extraBonuses, player, extraBonusPlayerCollision, null, this);
            game.physics.arcade.overlap(player.getBullets(), aliens, bulletCollision, null, this);
            game.physics.arcade.overlap(player.getBullets(), bonuses, bulletBonusCollision, null, this);

        };


        function bulletCollision(bullet, alien) {
            bullet.kill();
            new MyGame.EventDispatcher().dispatch("scored", 10);
            alien.explode();
        }

        function bulletBonusCollision(bullet, bonus) {
            bullet.kill();
            new MyGame.Explosions(game).explode(bonus);
            resetElement(bonus);
        }

        function bonusPlayerCollision(player, bonus) {
            new MyGame.EventDispatcher().dispatch("scored", 20);
            resetElement(bonus);
            bonus.destroy();
        }

        function extraBonusPlayerCollision(player, bonus) {
            bonus.kill();
            aliens.explode();
        }

        function alienCollision(player1, alien1) {
            new MyGame.Explosions(game).explode(alien1);
            alien1.kill();
            player1.dead();

            var timer = game.time.create(false);
            timer.loop(2000, function () {
                game.state.start('GameOver');
            }, this);
            timer.start();

        }

        function resetElement(element) {
            element.reset(50 + Math.random() * (game.world.width - 50), 0);
            element.body.velocity.y = 25 + Math.random() * 40;
        }

    };

})();
