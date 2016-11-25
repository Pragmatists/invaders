MyGame.Game = function (game) {
};
MyGame.Game.prototype = {
    create: function () {
        var width = 800 * window.devicePixelRatio;
        var height = 600 * window.devicePixelRatio;
        this.player = {};
        this.aliens = {};
        this.bonuses = {};
        this.bullets = {};
        this.bulletTime = 0;
        this.cursors = {};
        this.fireButton = {};
        this.explosions = {};
        this.starfield = {};
        this.score = 0;
        this.scoreString = '';
        this.scoreText = {};
        this.lives = {};
        this.stateText = '';
        this.controls = new Controls(this.game);

        window.addEventListener("deviceorientation", this.handleOrientation, true);

        this.starfield = this.game.add.tileSprite(this.game.world.centerX, this.game.world.centerY, width, height, 'space');
        this.game.physics.setBoundsToWorld();

        this.starfield.anchor.set(0.5);

        //this.scale.pageAlignHorizontally = true;

        //  Our bullet group
        this.bullets = this.game.add.group();
        //bullets.scale.setTo(scaleRatio, scaleRatio);
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(30, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);

        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.height - 100, 'ship');
        //player.scale.setTo(scaleRatio, scaleRatio); //http://www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/
        this.player.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

        this.createAliens.call(this, game);
        this.createBonuses.call(this, game);

        //  The score
        this.scoreString = 'Story Points : ';
        this.scoreText = this.game.add.text(10, 10, this.scoreString + this.score, {font: '34px Arial', fill: '#fff'});

        //  Lives
        this.lives = this.game.add.group();

        //  Text
        this.stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, ' ', {
            font: '84px Arial',
            fill: '#fff'
        });
        this.stateText.anchor.setTo(0.5, 0.5);
        this.stateText.visible = false;


        //  An explosion pool
        this.explosions = this.game.add.group();
        this.explosions.createMultiple(30, 'kaboom');
        this.explosions.forEach(this.setupInvader, this);

        //  And some controls to play the game with
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.controls.create();
    },
    resetElement: function (element) {
        //  Move the alien to the top of the screen again
        element.reset(50 + Math.random() * (this.game.world.width - 50), 0);

        //  And give it a new random velocity
        element.body.velocity.y = 25 + Math.random() * 40;
    },
    update: function () {
        this.starfield.tilePosition.y += 2;

        if (this.player.alive) {
            //  Reset the player, then check for movement keys
            this.player.body.velocity.setTo(0, 0);
            this.controls.update(this.player);

            if (this.cursors.left.isDown) {
                this.player.body.velocity.x = -200;
            }
            else if (this.cursors.right.isDown) {
                this.player.body.velocity.x = 200;
            }

            //  Firing?
            if (this.fireButton.isDown) {
                this.fireBullet();
            }


            //  Run collision
            this.game.physics.arcade.overlap(this.aliens, this.player, this.alienCollision, null, this);
            this.game.physics.arcade.overlap(this.bonuses, this.player, this.bonusPlayerCollision, null, this);
            this.game.physics.arcade.overlap(this.bullets, this.aliens, this.bulletCollision, null, this);
            this.game.physics.arcade.overlap(this.bullets, this.bonuses, this.bulletBonusCollision, null, this);
        }
    },
    bulletCollision: function (bullet, alien) {

        bullet.kill();

        this.score += 20;
        this.scoreText.text = this.scoreString + this.score;

        //  And create an explosion :)
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(alien.body.x, alien.body.y);
        explosion.play('kaboom', 30, false, true);

        this.resetElement(alien);
    },
    bulletBonusCollision: function (bullet, bonus) {
        bullet.kill();
        //  And create an explosion :)
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(bonus.body.x, bonus.body.y);
        explosion.play('kaboom', 30, false, true);

        this.resetElement(bonus);
    },
    bonusPlayerCollision: function (bonus, player) {
        this.score += 20;
        this.scoreText.text = this.scoreString + this.score;
        //resetElement(bonus);
        player.destroy();
    },
    alienCollision: function (alien, player) {
        alien.kill();
        player.kill();


        //  And create an explosion :)
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(alien.body.x, alien.body.y);
        explosion.play('kaboom', 30, false, true);

        var explosion2 = this.explosions.getFirstExists(false);
        explosion2.reset(player.body.x, player.body.y);
        explosion2.play('kaboom', 30, false, true);


        //  Game over
        //TODO
        this.stateText.text = " GAME OVER \n Click to restart";
        this.stateText.visible = true;

        //the "click to restart" handler
        this.game.input.onTap.addOnce(this.restart, this);


    },
    fireBullet: function () {

        if (this.game.time.now > this.bulletTime) {

            //  Grab the first bullet we can from the pool
            this.bullet = this.bullets.getFirstExists(false);
            if (this.bullet) {
                //  And fire it
                this.bullet.reset(this.player.x, this.player.y + 8);
                this.bullet.body.velocity.y = -400;
                this.bulletTime = this.game.time.now + 200;
            }
        }
    },
    setupInvader: function (invader) {
        invader.anchor.x = 0.5;
        invader.anchor.y = 0.5;

        invader.animations.add('kaboom');
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
    restart: function () {
        //  A new level starts

        //resets the life count
        this.lives.callAll('revive');
        //  And brings the aliens back from the dead :)
        this.aliens.removeAll();
        this.bonuses.removeAll();
        this.createAliens(game);
        this.createBonuses(game);

        //revives the player
        this.player.revive();
        //hides the text
        this.stateText.visible = false;


        this.scoreText.setText("Story points: 0");
    },
    handleOrientation: function (e) {
        // Device Orientation API
        var x = e.gamma; // range [-90,90], left-right
        var y = e.beta;  // range [-180,180], top-bottom
        var z = e.alpha; // range [0,360], up-down
        //MyGame._player.body.velocity.x += x;
        //MyGame._player.body.velocity.y += y*0.5;
    }

}
;