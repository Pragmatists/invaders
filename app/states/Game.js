MyGame.Game = function (game) {
};
MyGame.Game.prototype = {
    create: function () {
        var width = 800 * window.devicePixelRatio;
        var height = 600 * window.devicePixelRatio;
        this.player = {};
        this.aliens = {};
        this.bonuses = {};
        this.cursors = {};
        this.fireButton = {};
        this.explosions = {};
        this.starfield = {};
        this.controls = new Controls(this.game);
        this.score = new ScoreBoard(this.game);

        window.addEventListener("deviceorientation", this.handleOrientation, true);
        this.starfield = this.game.add.tileSprite(this.game.world.centerX, this.game.world.centerY, width, height, 'space');
        this.game.physics.setBoundsToWorld();

        this.starfield.anchor.set(0.5);


        this.createAliens();
        this.createBonuses();


        this.explosions = this.game.add.group();
        this.explosions.createMultiple(30, 'kaboom');
        this.explosions.forEach(this.setupExploder, this);


        this.player = new Player(this.game, this.explosions);


        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.controls.create();

        this.score.create();

    },
    resetElement: function (element) {
        element.reset(50 + Math.random() * (this.game.world.width - 50), 0);
        element.body.velocity.y = 25 + Math.random() * 40;
    },
    update: function () {
        this.starfield.tilePosition.y += 2;

        if (this.player.alive) {

            this.player.move(this.controls, this.cursors);

            if (this.fireButton.isDown) {
                this.player.fireBullet();
            }

            this.game.physics.arcade.overlap(this.aliens, this.player, this.alienCollision, null, this);
            this.game.physics.arcade.overlap(this.bonuses, this.player, this.bonusPlayerCollision, null, this);
            this.game.physics.arcade.overlap(this.player.getBullets(), this.aliens, this.bulletCollision, null, this);
            this.game.physics.arcade.overlap(this.player.getBullets(), this.bonuses, this.bulletBonusCollision, null, this);
        }
    },
    bulletCollision: function (bullet, alien) {

        bullet.kill();

        this.score.update();

        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(alien.body.x, alien.body.y);
        explosion.play('kaboom', 30, false, true);

        this.resetElement(alien);
    },
    bulletBonusCollision: function (bullet, bonus) {
        bullet.kill();

        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(bonus.body.x, bonus.body.y);
        explosion.play('kaboom', 30, false, true);

        this.resetElement(bonus);
    },
    bonusPlayerCollision: function (bonus, player) {
        this.score.update();
        //resetElement(bonus);
        player.destroy();
    },

    alienCollision: function (alien, player) {
        alien.kill();

        this.player.dead();

        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(alien.body.x, alien.body.y);
        explosion.play('kaboom', 30, false, true);


        var timer = this.game.time.create(false);
        timer.loop(2000, function () {
            this.game.state.start('GameOver');
        }, this);
        timer.start();

    },

    setupExploder: function (game) {
        game.anchor.x = 0.5;
        game.anchor.y = 0.5;

        game.animations.add('kaboom');
    },

    createAliens: function (game) {
        this.aliens = this.game.add.group();
        //aliens.scale.setTo(scaleRatio, scaleRatio);
        this.aliens.enableBody = true;
        this.aliens.physicsBodyType = Phaser.Physics.ARCADE;

        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 5; x++) {
                var alien = this.aliens.create(Math.random() * (this.game.world.width - 50), y * 50 + Math.random() * 10, 'alien');
                alien.name = 'alien' + x.toString() + y.toString();
                alien.checkWorldBounds = true;
                alien.events.onOutOfBounds.add(this.resetElement, this);
                alien.body.velocity.y = 25 + Math.random() * 100;
            }
        }
    },
    createBonuses: function (game) {
        this.bonuses = this.game.add.group();
        //bonuses.scale.setTo(scaleRatio, scaleRatio);
        this.bonuses.enableBody = true;
        this.bonuses.physicsBodyType = Phaser.Physics.ARCADE;

        //number based on of screen size
        for (var x = 0; x < 6; x++) {
            var bonus = this.bonuses.create(Math.random() * (this.game.world.width - 50), 0, 'bonus');
            bonus.name = 'bonus' + x.toString();
            bonus.checkWorldBounds = true;
            bonus.events.onOutOfBounds.add(this.resetElement, this);
            bonus.body.velocity.y = 25 + Math.random() * 100;
        }

        for (var z = 0; z < 4; z++) {
            var mediumBonus = this.bonuses.create(Math.random() * (this.game.world.width - 50), 0, 'bonus-medium');
            mediumBonus.name = 'bonus' + z.toString();
            mediumBonus.checkWorldBounds = true;
            mediumBonus.events.onOutOfBounds.add(this.resetElement, this);
            mediumBonus.body.velocity.y = 25 + Math.random() * 150;
        }

        for (var y = 0; y < 2; y++) {
            var bigBonus = this.bonuses.create(Math.random() * (this.game.world.width - 50), 0, 'bonus-large');
            bigBonus.name = 'bonus' + y.toString();
            bigBonus.checkWorldBounds = true;
            bigBonus.events.onOutOfBounds.add(this.resetElement, this);
            bigBonus.body.velocity.y = 25 + Math.random() * 180;
        }
    }

    ,

    handleOrientation: function (e) {
        // Device Orientation API
        var x = e.gamma; // range [-90,90], left-right
        var y = e.beta;  // range [-180,180], top-bottom
        var z = e.alpha; // range [0,360], up-down

    }

}
;