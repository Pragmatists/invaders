(function () {
    MyGame.MainMenu = function (game) {
    };
    MyGame.MainMenu.prototype = {
        create: function () {
            var title = this.game.add.image(this.game.world.centerX,this.game.world.centerY -100, 'text-title');
            title.anchor.setTo(0.5, 0.5);
            title.scale.setTo(0.7, 0.7);

            var start = this.game.add.image(this.game.world.centerX,this.game.world.centerY, 'text-start-game');
            start.anchor.setTo(0.5, 0.5);
            start.scale.setTo(0.7, 0.7);

            this.game.input.onDown.add(this.startGame, this);
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