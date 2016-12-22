(function () {
    MyGame.Credits = function (game) {
    };
    MyGame.Credits.prototype = {
        create: function () {

            var image = this.game.add.image(this.game.world.centerX,this.game.world.centerY -100, 'text-game-over');
            image.anchor.setTo(0.5, 0.5);


            this.game.input.onDown.add(this.restartGame, this);

        },
        restartGame: function () {
            var click = this.game.add.audio('click');
            click.play("",0,0.5);
            MyGame.score = 0;
            MyGame.speed = 0;
            this.game.state.start('Game');
        }
    };

})();