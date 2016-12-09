(function () {
    MyGame.Howto = function (game) {
    };
    MyGame.Howto.prototype = {
        create: function () {

            var howTo =  this.game.add.image(50, 50, 'how-to' );
            this.game.input.onDown.add(this.startGame, this);
        },
        startGame: function () {
            this.game.state.start('Game');
        }
    };

})();

