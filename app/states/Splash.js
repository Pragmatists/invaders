(function () {
    MyGame.Splash = function (game) {
    };
    MyGame.Splash.prototype = {
        create: function () {

            var tween;

            var pragmatists = this.game.add.image(this.game.world.centerX, this.game.world.centerY - 100, 'logo-pragmatists');
            pragmatists.anchor.setTo(0.5, 0.5);
            pragmatists.scale.setTo(0.5, 0.5);
            pragmatists.alpha = 0;

            var title = this.game.add.image(this.game.world.centerX, this.game.world.centerY - 100, 'text-game-title');
            title.anchor.setTo(0.5, 0.5);
            title.scale.setTo(0.1, 0.1);
            title.alpha = 0;


            tween = this.game.add.tween(pragmatists).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(function () {
                tween = this.game.add.tween(pragmatists).to({y: 300}, 2000, Phaser.Easing.Bounce.Out, true);
                tween.onComplete.add(function () {
                    tween = this.game.add.tween(title.scale).to({
                        x: 0.7,
                        y: 0.7
                    }, 2000, Phaser.Easing.Linear.None, true);
                    this.game.add.tween(title).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true);
                    tween.onComplete.add(function () {
                        showActionToStart(this.game);
                    }, this);
                }, this);
            }, this);

            function showActionToStart(game) {
                var text;
                if (game.device.desktop) {
                    text = 'text-click-to-start';
                } else {
                    text = 'text-tap-to-start';
                }
                var start = game.add.image(game.world.centerX, game.world.centerY , text);
                start.anchor.setTo(0.5, 0.5);
                start.scale.setTo(0.5, 0.5);
            }

            this.game.input.onDown.add(this.startGame, this);


        },
        startGame: function () {
            var click = this.game.add.audio('click');
            click.play("",0,0.5);
            if (this.game.scale.isFullScreen) {
                this.game.scale.stopFullScreen();
            }
            else {
                this.game.scale.startFullScreen(false);
            }
            this.game.state.start('Howto');
        }
    };

})();