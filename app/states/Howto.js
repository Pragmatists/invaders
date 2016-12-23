(function () {
    MyGame.Howto = function (game) {
    };
    MyGame.Howto.prototype = {
        create: function () {

            this.game.add.image(50, 50, 'howto1' );
            this.game.add.image(50, 70, 'howto2' );
            this.game.add.image(50, 100, 'howto3' );
            this.game.add.image(50, 130, 'howto4' );
            var alien = this.game.add.image(150, 120, 'alien' );
            alien.scale.setTo(0.7, 0.7);

            this.game.add.image(50, 160, 'howto5' );
            var us = this.game.add.image(200, 150, 'bonus-small' );
            us.scale.setTo(0.7, 0.7);
            this.game.add.image(50, 190, 'howto6' );
            var epic = this.game.add.image(150, 180, 'bonus-medium' );
            epic.scale.setTo(0.7, 0.7);

            this.game.add.image(50, 240, 'howto9' );
            var shield = this.game.add.image(210, 225, 'star' );
            shield.scale.setTo(0.7, 0.7);
            this.game.add.image(50, 260, 'howto10' );

            if (this.game.device.desktop){
                this.game.add.image(100, 400, 'howto12');
                this.game.add.image(50, 300, 'control1');
            }

            this.game.input.onDown.add(this.startGame, this);
        },
        startGame: function () {
            var click = this.game.add.audio('click');
            click.play("",0,0.5);
            this.game.state.start('Game');
        }
    };

})();

