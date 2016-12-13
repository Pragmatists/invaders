(function () {
    MyGame.Splash = function (game) {
    };
    MyGame.Splash.prototype = {
        create: function () {


            var pragmatists = this.game.add.image(this.game.world.centerX,this.game.world.centerY, 'pragmatists');
            pragmatists.anchor.setTo(0.5, 0.5);
            pragmatists.scale.setTo(0.2, 0.2);

            var presents = this.game.add.image(this.game.world.centerX,this.game.world.centerY +100, 'presents');
            presents.anchor.setTo(0.5, 0.5);
            presents.scale.setTo(0.7, 0.7);

            this.game.input.onDown.add(this.startGame, this);

        },
        startGame: function () {

            this.game.state.start('MainMenu');
        }
    };

})();