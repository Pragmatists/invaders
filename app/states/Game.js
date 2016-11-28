MyGame.Game = function (game) {
};
MyGame.Game.prototype = {
    create: function () {

        this.controls = new Controls(this.game).create();
        this.score = new ScoreBoard(this.game).create();
        this.starfield = new Starfield(this.game).create();
        this.aliens = new Aliens(this.game).create();
        this.bonuses = new Bonuses(this.game).create();
        this.explosions = new Explosions(this.game).create();
        this.player = new Player(this.game, this.explosions);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.extraBonuses = new ExtraBonuses(this.game).create();

    },
    update: function () {
        this.starfield.scroll();

        if (this.player.alive) {

            this.player.move(this.controls, this.cursors);

            this.game.physics.arcade.overlap(this.aliens, this.player, this.alienCollision, null, this);
            this.game.physics.arcade.overlap(this.bonuses, this.player, this.bonusPlayerCollision, null, this);
            this.game.physics.arcade.overlap(this.extraBonuses, this.player, this.extraBonusPlayerCollision, null, this);
            this.game.physics.arcade.overlap(this.player.getBullets(), this.aliens, this.bulletCollision, null, this);
            this.game.physics.arcade.overlap(this.player.getBullets(), this.bonuses, this.bulletBonusCollision, null, this);
        }
    },
    bulletCollision: function (bullet, alien) {

        bullet.kill();

        this.score.update();

        this.explosions.explode(alien);
        this.resetElement(alien);
    },
    bulletBonusCollision: function (bullet, bonus) {
        bullet.kill();
        this.explosions.explode(bonus);
        this.resetElement(bonus);
    },
    bonusPlayerCollision: function (bonus, player) {
        this.score.update();
        //resetElement(bonus);
        player.destroy();
    },

    extraBonusPlayerCollision: function (bonus, player) {
        player.kill();
        this.aliens.forEach(function (c) { });
    },

    alienCollision: function (alien, player) {
        alien.kill();

        this.player.dead();
        this.explosions.explode(alien);

        var timer = this.game.time.create(false);
        timer.loop(2000, function () {
            this.game.state.start('GameOver');
        }, this);
        timer.start();

    },
    resetElement: function (element) {
        element.reset(50 + Math.random() * (this.game.world.width - 50), 0);
        element.body.velocity.y = 25 + Math.random() * 40;
    }

};