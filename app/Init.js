var MyGame = (function () {

    var initGame = function () {
        var game = new Phaser.Game(320, 480, Phaser.CANVAS, 'game');

        game.state.add('Preloader', MyGame.Preloader);
        game.state.add('Splash', MyGame.Splash);
        game.state.add('MainMenu', MyGame.MainMenu);
        game.state.add('Howto', MyGame.Howto);
        game.state.add('Game', MyGame.Game);
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