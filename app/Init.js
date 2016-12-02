var MyGame = (function () {

    var initGame = function () {
        var game = new Phaser.Game(320, 480, Phaser.CANVAS, 'game');

        game.state.add('Preloader', MyGame.Preloader);
        game.state.add('MainMenu', MyGame.MainMenu);
        game.state.add('Howto', MyGame.Howto);
        game.state.add('Level1', MyGame.Level1);
        game.state.add('Level2', MyGame.Level2);
        game.state.add('Level3', MyGame.Level3);
        game.state.add('GameOver', MyGame.GameOver);

        game.state.start('Preloader');
    };

    return {
        _WIDTH: 320 * window.devicePixelRatio,
        _HEIGHT: 480 * window.devicePixelRatio,
        scaleRatio: window.devicePixelRatio / 3,
        score: 0,
        initGame: initGame
    }

})();