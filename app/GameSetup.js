function GameSetup() {

    this.startGame = function(){
        var width = 800 * window.devicePixelRatio;
        var height = 600 * window.devicePixelRatio;
        var scaleRatio = window.devicePixelRatio / 3
        var game = new Phaser.Game(320, 480, Phaser.CANVAS, 'game');

        game.state.add('Preloader', MyGame.Preloader);
        game.state.add('MainMenu', MyGame.MainMenu);
        game.state.add('Howto', MyGame.Howto);
        game.state.add('Game', MyGame.Game);
        game.state.add('GameOver', MyGame.GameOver);

        game.state.start('Preloader');
    }

}
