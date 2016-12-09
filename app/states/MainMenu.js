(function () {
    MyGame.MainMenu = function (game) {
    };
    MyGame.MainMenu.prototype = {
        create: function () {
            this.startButton = this.add.button(this.game.world.centerX, this.game.world.centerY, 'button-start', this.startGame, this, 2, 0, 1);
            this.startButton.anchor.set(0.5, 0);
            this.startButton.input.useHandCursor = true;
            //this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        },
        startGame: function () {
            if (this.game.scale.isFullScreen)
            {
                this.game.scale.stopFullScreen();
            }
            else
            {
                this.game.scale.startFullScreen(false);
            }
            this.game.state.start('Howto');
        }
    };

})();