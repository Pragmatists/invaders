MyGame.Game = function (game) {
};
MyGame.Game.prototype = {
    create: function () {

        this.padControls = new PadControls(this.game);
        this.keyboardControls = new KeyboardControls(this.game);
        this.score = new ScoreBoard(this.game);
        this.starfield = new Starfield(this.game);
        this.bonuses = new Bonuses(this.game);
        this.explosions = new Explosions(this.game);

        this.aliens = new Aliens(this.game);
        this.player = new Player(this.game, this.explosions);
        this.extraBonuses = new ExtraBonuses(this.game, this.explosions);

    },
    update: function () {
        this.starfield.scroll();

        if (this.player.alive) {

            this.padControls.update();
            this.keyboardControls.update();

            this.game.physics.arcade.overlap(this.aliens, this.player, this.alienCollision, null, this);
            this.game.physics.arcade.overlap(this.bonuses, this.player, this.bonusPlayerCollision, null, this);
            this.game.physics.arcade.overlap(this.extraBonuses, this.player, this.extraBonusPlayerCollision, null, this);
            this.game.physics.arcade.overlap(this.player.getBullets(), this.aliens, this.bulletCollision, null, this);
            this.game.physics.arcade.overlap(this.player.getBullets(), this.bonuses, this.bulletBonusCollision, null, this);
        }
    },
    shutdown: function () {
        this.padControls.destroy();
    },
    bulletCollision: function (bullet, alien) {
        bullet.kill();
        new EventDispatcher().dispatch("scored", 10);
        alien.explode(this.explosions);
    },
    bulletBonusCollision: function (bullet, bonus) {
        bullet.kill();
        this.explosions.explode(bonus);
        this.resetElement(bonus);
    },
    bonusPlayerCollision: function (bonus, player) {
        new EventDispatcher().dispatch("scored", 20);
        this.resetElement(player);
        player.destroy();
    },

    extraBonusPlayerCollision: function (bonus, player) {
        player.kill();
        this.aliens.forEach(function (c) {
        });
    },

    alienCollision: function (alien, player) {
        this.explosions.explode(alien);
        alien.kill();
        this.player.dead();

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