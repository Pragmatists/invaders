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
            alien.explode();
        }

        function bulletBonusCollision(bullet, bonus) {
            bullet.kill();
            bonus.explode();
        }

        function bonusPlayerCollision(player, bonus) {
            bonus.collect();
        }

        function extraBonusPlayerCollision(player, bonus) {
            bonus.collect();
            aliens.explode();
        }

        function alienCollision(player, alien) {
            alien.explode();
            player.dead();
            goToGameOverState.call(this);
        }

        function goToGameOverState() {
            var timer = game.time.create(false);
            timer.loop(2000, function () {
                game.state.start('GameOver');
            }, this);
            timer.start();
        }

    };

})();
