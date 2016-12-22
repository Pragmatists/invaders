(function () {
    MyGame.GameOver = function (game) {
    };
    MyGame.GameOver.prototype = {
        create: function () {

            var image = this.game.add.image(this.game.world.centerX,this.game.world.centerY -100, 'text-game-over');
            image.anchor.setTo(0.5, 0.5);

            this.startButton = this.add.button(this.game.world.centerX, this.game.world.centerY, 'text-try-again', this.restartGame, this, 2, 0, 1);
            this.startButton.anchor.set(0.5, 0.5);
            this.startButton.scale.setTo(0.5, 0.5);
            this.startButton.input.useHandCursor = true;

            this.facebookButton = this.add.button(this.game.world.centerX, this.game.world.centerY + 60, 'text-share', this.shareResult, this, 2, 0, 1);
            this.facebookButton.anchor.set(0.5, 0.5);
            this.facebookButton.input.useHandCursor = true;

            this.credits = this.add.button(this.game.world.centerX, this.game.world.centerY + 120, 'text-credits', this.showCredits, this, 2, 0, 1);
            this.credits.anchor.set(0.5, 0.5);
            this.credits.input.useHandCursor = true;

        },
        restartGame: function () {
            var click = this.game.add.audio('click');
            click.play("",0,0.5);
            MyGame.score = 0;
            MyGame.speed = 0;
            this.game.state.start('Game');
        },
        shareResult: function () {
            var click = this.game.add.audio('click');
            click.play("",0,0.5);
            var message = 'I have successfully completed ' + MyGame.score + ' Story Points!';
            
            FB.ui({
              method: 'share',
              quote: message,
              href: 'http://pragmatists.github.io/invaders'
            }, function(response){});            
            
        },

        showCredits: function () {
            var click = this.game.add.audio('click');
            click.play("",0,0.5);
            this.game.state.start('Credits');
        }

    };

})();