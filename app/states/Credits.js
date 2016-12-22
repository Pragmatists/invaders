(function () {

    MyGame.Credits = function (game) {};
    MyGame.Credits.prototype = {
        create: function () {

            this.image = this.game.add.tileSprite(0,0, 320, 480, 'credits-page');

            this.game.input.onDown.add(this.restartGame, this);

        },
        update:function(){
            if(this.image.tilePosition.y>-2600){
                this.image.tilePosition.y -=1;
            }
        },
        restartGame: function () {
            var click = this.game.add.audio('click');
            click.play("",0,0.5);
            MyGame.score = 0;
            MyGame.speed = 0;
            this.game.state.start('Splash');
        }
    };

})();