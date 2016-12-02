(function () {
    MyGame.ScoreBoard = function (game) {
        var scoreString = game.state.getCurrentState().levelName+ 'Story Points : ';
        var scoreText = game.add.text(10, 10, scoreString + MyGame.score, {
            font: '20px Arial',
            fill: '#fff'
        });

        new MyGame.EventDispatcher().register('scored', function (score) {
            update(score)
        });

        var update = function (value) {
            MyGame.score += value;
            scoreText.text = scoreString + MyGame.score;

            //TODO refactor to separate object LevelSwitcher
            if (MyGame.score >= game.state.getCurrentState().levlePoints) {
                var timer = game.time.create(false);
                game.physics.arcade.isPaused = true;
                game.add.text(game.world.centerX, game.world.centerY, 'Sprint completed', {
                    font: '20px Arial',
                    fill: '#fff'
                });
                timer.loop(3000, function () {
                    game.state.start(game.state.getCurrentState().nextLevel());
                    game.physics.arcade.isPaused = false;
                }, this);
                timer.start();

            }
        };

    };

})();



