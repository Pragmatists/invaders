(function () {
    MyGame.Game = function (game) {};
    MyGame.Game.prototype = {
        create: function () {

            new MyGame.EventDispatcher().reset();
            

            this.starfield = new MyGame.Starfield(this.game);
            this.score = new MyGame.ScoreBoard(this.game);
            this.bonuses = new MyGame.Bonuses(this.game);
            this.aliens = new MyGame.Aliens(this.game);
            this.player = new MyGame.Player(this.game);
            this.extraBonuses = new MyGame.ExtraBonuses(this.game);
            this.collisions = new MyGame.Collisions(this.game, this.aliens);
            new MyGame.Levels(this.game);
            new MyGame.Conditions(this.game);

            if (this.game.device.desktop){
                this.controlls = new MyGame.KeyboardControls(this.game);
            }else{
                this.controlls = new MyGame.PadControls(this.game);
            }

        },
        update: function () {
            
            this.starfield.scroll();

            if (this.player.alive) {
                this.controlls.update(this.player);
                this.collisions.update(this.player, this.bonuses, this.extraBonuses, this.aliens)
            }
        },
        shutdown: function () {
            this.controlls.destroy();
        },
        render:function(){
        }

    };

})();