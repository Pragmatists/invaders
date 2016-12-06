(function () {
    MyGame.Game = function (game) {};
    MyGame.Game.prototype = {
        create: function () {

            new MyGame.EventDispatcher().reset();
            
            this.padControls = new MyGame.PadControls(this.game);
            this.keyboardControls = new MyGame.KeyboardControls(this.game);
            this.starfield = new MyGame.Starfield(this.game);
            this.score = new MyGame.ScoreBoard(this.game);
            this.levels = new MyGame.Levels(this.game);
            this.bonuses = new MyGame.Bonuses(this.game);
            this.aliens = new MyGame.Aliens(this.game);
            this.player = new MyGame.Player(this.game);
            this.extraBonuses = new MyGame.ExtraBonuses(this.game);
            this.collisions = new MyGame.Collisions(this.game, this.aliens);

        },
        update: function () {
            
            this.starfield.scroll();

            if (this.player.alive) {

                this.padControls.update();
                this.keyboardControls.update();

                this.collisions.update(this.player, this.bonuses, this.extraBonuses, this.aliens)
            }
        },
        shutdown: function () {
            this.padControls.destroy();
        }

    };

})();