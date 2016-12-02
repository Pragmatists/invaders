(function () {
    MyGame.Game = function (game) {};
    MyGame.Game.prototype = {
        create: function () {

            this.padControls = new MyGame.PadControls(this.game);
            this.keyboardControls = new MyGame.KeyboardControls(this.game);
            this.starfield = new MyGame.Starfield(this.game);
            this.score = new MyGame.ScoreBoard(this.game);
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
    MyGame.Level1 = function (game) {
        this.levelName='sprint 1';
        this.levelSpeed=30;
        this.levlePoints = 20;
        this.nextLevel = function(){
            return 'Level2';
        }
    };
    MyGame.Level1.prototype = Object.create(MyGame.Game.prototype);

    MyGame.Level2 = function (game) {
        this.levelName='sprint 2';
        this.levelSpeed=40;
        this.levlePoints = 30;
        this.nextLevel = function(){
            return 'Level3';
        }
    };
    MyGame.Level2.prototype = Object.create(MyGame.Game.prototype);

    MyGame.Level3 = function (game) {
        this.levelName='sprint 3';
        this.levelSpeed=50;
        this.levlePoints = 80;
        this.nextLevel = function(){
            return 'GameOver';
        }
    };
    MyGame.Level3.prototype = Object.create(MyGame.Game.prototype);


})();