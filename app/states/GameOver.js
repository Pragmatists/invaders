(function () {
    MyGame.GameOver = function (game) {
    };
    MyGame.GameOver.prototype = {
        create: function () {

            this.stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, ' ', {
                font: '34px Arial',
                fill: '#fff'
            });
            this.stateText.anchor.setTo(0.5, 0.5);
            this.stateText.visible = false;

            this.stateText.text = " GAME OVER \n " + "Your score:" + MyGame.score + "\n Click to restart";
            this.stateText.visible = true;

            this.startButton = this.add.button(MyGame._WIDTH * 0.5, 200, 'button-start', this.restartGame, this, 2, 0, 1);
            this.startButton.anchor.set(0.5, 0);
            this.startButton.input.useHandCursor = true;

            this.facebookButton = this.add.button(MyGame._WIDTH * 0.5, 260, 'button-facebook', this.shareResult, this, 2, 0, 1);
            this.facebookButton.anchor.set(0.5, 0);
            this.facebookButton.input.useHandCursor = true;

        },
        restartGame: function () {
            this.stateText.visible = false;
            MyGame.score = 0;
            this.game.state.start('Level1');
        },
        shareResult: function () {
           //TODO
        }

    };

})();