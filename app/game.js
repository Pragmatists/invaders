function MyGame() {


    this.start = function () {
        var width = window.innerWidth * window.devicePixelRatio;
        var height = window.innerHeight * window.devicePixelRatio;
        var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser-example', {
            preload: preload,
            create: create,
            update: update
        });


        var player;
        var aliens;
        var bonuses;
        var bullets;
        var bulletTime = 0;
        var cursors;
        var fireButton;
        var explosions;
        var starfield;
        var score = 0;
        var scoreString = '';
        var scoreText;
        var lives;
        var enemyBullet;
        var firingTimer = 0;
        var stateText;
        var livingEnemies = [];
        var controls = new Controls(game);

        function preload() {
            game.load.image('space', 'assets/starfield.png');
            game.load.image('alien', 'assets/space-baddie.png');
            game.load.image('bonus', 'assets/carrot.png');
            game.load.image('ship', 'assets/shmup-ship.png');
            game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
            game.load.image('bullet', 'assets/bullet.png');
            controls.preload();

        }


        function create() {

            starfield = game.add.tileSprite(game.world.centerX, game.world.centerY, width, height, 'space');
            game.physics.setBoundsToWorld();

            starfield.anchor.set(0.5);
            game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.startFullScreen(true);

            //  Our bullet group
            bullets = game.add.group();
            bullets.enableBody = true;
            bullets.physicsBodyType = Phaser.Physics.ARCADE;
            bullets.createMultiple(30, 'bullet');
            bullets.setAll('anchor.x', 0.5);
            bullets.setAll('anchor.y', 1);
            bullets.setAll('outOfBoundsKill', true);
            bullets.setAll('checkWorldBounds', true);

            player = game.add.sprite(game.world.centerX, game.world.height -100, 'ship');
            player.anchor.setTo(0.5, 0.5);
            game.physics.enable(player, Phaser.Physics.ARCADE);

            createAliens.call(this, game);
            createBonuses.call(this, game);

        //  The score
            scoreString = 'Story Points : ';
            scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

            //  Lives
            lives = game.add.group();

            //  Text
            stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
            stateText.anchor.setTo(0.5, 0.5);
            stateText.visible = false;


            //  An explosion pool
            explosions = game.add.group();
            explosions.createMultiple(30, 'kaboom');
            explosions.forEach(setupInvader, this);

            //  And some controls to play the game with
            cursors = game.input.keyboard.createCursorKeys();
            fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            controls.create();
        }

        function resetElement(element) {

            //  Move the alien to the top of the screen again
            element.reset(50 + Math.random()*(game.world.width-50), 0);

            //  And give it a new random velocity
            element.body.velocity.y = 25 + Math.random() * 40;

        }

        function update() {

            starfield.tilePosition.y += 2;

            if (player.alive)
            {
                //  Reset the player, then check for movement keys
                player.body.velocity.setTo(0, 0);
                controls.update(player);

                if (cursors.left.isDown)
                {
                    player.body.velocity.x = -200;
                }
                else if (cursors.right.isDown)
                {
                    player.body.velocity.x = 200;
                }

                //  Firing?
                if (fireButton.isDown)
                {
                    fireBullet();
                }


                //  Run collision
                game.physics.arcade.overlap(aliens, player, alienCollision, null, this);
                game.physics.arcade.overlap(bonuses, player, bonusPlayerCollision, null, this);
                game.physics.arcade.overlap(bullets, aliens, bulletCollision, null, this);
                game.physics.arcade.overlap(bullets, bonuses, bulletBonusCollision, null, this);
            }
        }

        function bulletCollision (bullet, alien) {

            bullet.kill();

            score += 20;
            scoreText.text = scoreString + score;

            //  And create an explosion :)
            var explosion = explosions.getFirstExists(false);
            explosion.reset(alien.body.x, alien.body.y);
            explosion.play('kaboom', 30, false, true);

            resetElement(alien);
        }

        function bulletBonusCollision (bullet, bonus) {

            bullet.kill();
            //  And create an explosion :)
            var explosion = explosions.getFirstExists(false);
            explosion.reset(bonus.body.x, bonus.body.y);
            explosion.play('kaboom', 30, false, true);

            resetElement(bonus);
        }

        function bonusPlayerCollision (bonus, player) {
            score += 20;
            scoreText.text = scoreString + score;
            //resetElement(bonus);
            player.destroy();
        }

        function alienCollision (alien, player) {

            alien.kill();
            player.kill();



            //  And create an explosion :)
            var explosion = explosions.getFirstExists(false);
            explosion.reset(alien.body.x, alien.body.y);
            explosion.play('kaboom', 30, false, true);

            var explosion2 = explosions.getFirstExists(false);
            explosion2.reset(player.body.x, player.body.y);
            explosion2.play('kaboom', 30, false, true);


            //  Game over
            //TODO
            stateText.text=" GAME OVER \n Click to restart";
            stateText.visible = true;

            //the "click to restart" handler
            game.input.onTap.addOnce(restart,this);


        }
        function fireBullet () {

            if (game.time.now > bulletTime)
            {

                //  Grab the first bullet we can from the pool
                bullet = bullets.getFirstExists(false);
                if (bullet)
                {
                    //  And fire it
                    bullet.reset(player.x, player.y + 8);
                    bullet.body.velocity.y = -400;
                    bulletTime = game.time.now + 200;
                }
            }

        }

        function setupInvader (invader) {

            invader.anchor.x = 0.5;
            invader.anchor.y = 0.5;

            invader.animations.add('kaboom');
        }


        function createAliens( game) {
            aliens = game.add.group();
            aliens.enableBody = true;
            aliens.physicsBodyType = Phaser.Physics.ARCADE;

            for (var y = 0; y < 4; y++) {
                for (var x = 0; x < 10; x++) {
                    var alien = aliens.create(Math.random()*(game.world.width-50), y * 50 + Math.random()*10, 'alien');
                    alien.name = 'alien' + x.toString() + y.toString();
                    alien.checkWorldBounds = true;
                    alien.events.onOutOfBounds.add(resetElement, this);
                    alien.body.velocity.y = 25 + Math.random() * 40;
                }
            }

        }

        function createBonuses( game) {
            bonuses = game.add.group();
            bonuses.enableBody = true;
            bonuses.physicsBodyType = Phaser.Physics.ARCADE;

            for (var y = 0; y < 2; y++) {
                for (var x = 0; x < 5; x++) {
                    var bonus = bonuses.create(Math.random()*(game.world.width-50), 0, 'bonus');
                    bonus.name = 'bonus' + x.toString() + y.toString();
                    bonus.checkWorldBounds = true;
                    bonus.events.onOutOfBounds.add(resetElement, this);
                    bonus.body.velocity.y = 25 + Math.random() * 40;
                }
            }

        }

        function restart () {

            //  A new level starts

            //resets the life count
            lives.callAll('revive');
            //  And brings the aliens back from the dead :)
            aliens.removeAll();
            bonuses.removeAll();
            createAliens(game);
            createBonuses(game);

            //revives the player
            player.revive();
            //hides the text
            stateText.visible = false;


            scoreText.setText("Story points: 0");

        }

    }
}
