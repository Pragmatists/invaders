function MyGame() {


    this.start = function () {
        var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {
            preload: preload,
            create: create,
            update: update
        });

        function preload() {
            game.load.image('space', 'assets/space3.png');
            game.load.image('alien', 'assets/space-baddie.png');
            game.load.image('ship', 'assets/shmup-ship.png');
            game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
            game.load.image('bullet', 'assets/bullet.png');

        }

//good practice: http://phaser.io/examples/v2/virtualjoystick/horizontal-motion-lock
        var player;
        var aliens;
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

        function create() {


            game.add.sprite(0, 0, 'space');
            game.physics.setBoundsToWorld();
            //  Our bullet group
            bullets = game.add.group();
            bullets.enableBody = true;
            bullets.physicsBodyType = Phaser.Physics.ARCADE;
            bullets.createMultiple(30, 'bullet');
            bullets.setAll('anchor.x', 0.5);
            bullets.setAll('anchor.y', 1);
            bullets.setAll('outOfBoundsKill', true);
            bullets.setAll('checkWorldBounds', true);



            player = game.add.sprite(400, 500, 'ship');
            player.anchor.setTo(0.5, 0.5);
            game.physics.enable(player, Phaser.Physics.ARCADE);

            createAliens.call(this, game);

        //  The score
            scoreString = 'Score : ';
            scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

            //  Lives
            lives = game.add.group();
            game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

            //  Text
            stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
            stateText.anchor.setTo(0.5, 0.5);
            stateText.visible = false;

            for (var i = 0; i < 3; i++)
            {
                var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
                ship.anchor.setTo(0.5, 0.5);
                ship.angle = 90;
                ship.alpha = 0.4;
            }

            //  An explosion pool
            explosions = game.add.group();
            explosions.createMultiple(30, 'kaboom');
            explosions.forEach(setupInvader, this);

            //  And some controls to play the game with
            cursors = game.input.keyboard.createCursorKeys();
            fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


        }

        function alienOut(alien) {

            //  Move the alien to the top of the screen again
            alien.reset(alien.x, 0);

            //  And give it a new random velocity
            alien.body.velocity.y = 50 + Math.random() * 200;

        }

        function update() {
            if (player.alive)
            {
                //  Reset the player, then check for movement keys
                player.body.velocity.setTo(0, 0);

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
                game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
                game.physics.arcade.overlap(aliens, player, collisionHandler2, null, this);
            }
        }

        function setupInvader (invader) {

            invader.anchor.x = 0.5;
            invader.anchor.y = 0.5;
            invader.animations.add('kaboom');

        }
        function collisionHandler2 (alien, player) {

            //  When a bullet hits an alien we kill them both
            bullet.kill();
            alien.kill();

            //  Game over


            //  And create an explosion :)
            var explosion = explosions.getFirstExists(false);
            explosion.reset(alien.body.x, alien.body.y);
            explosion.play('kaboom', 30, false, true);

            var explosion2 = explosions.getFirstExists(false);
            explosion2.reset(player.body.x, player.body.y);
            explosion2.play('kaboom', 30, false, true);


        }
        function collisionHandler (bullet, alien) {

            //  When a bullet hits an alien we kill them both
            bullet.kill();
            alien.kill();

            //  Increase the score
            score += 20;
            scoreText.text = scoreString + score;

            //  And create an explosion :)
            var explosion = explosions.getFirstExists(false);
            explosion.reset(alien.body.x, alien.body.y);
            explosion.play('kaboom', 30, false, true);


        }
        function fireBullet () {

            //  To avoid them being allowed to fire too fast we set a time limit
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


        function createAliens( game) {
            aliens = game.add.group();
            aliens.enableBody = true;
            aliens.physicsBodyType = Phaser.Physics.ARCADE;

            for (var y = 0; y < 4; y++) {
                for (var x = 0; x < 10; x++) {
                    var alien = aliens.create(200 + x * 48, y * 50, 'alien');
                    alien.name = 'alien' + x.toString() + y.toString();
                    alien.checkWorldBounds = true;
                    alien.events.onOutOfBounds.add(alienOut, this);
                    alien.body.velocity.y = 10 + Math.random() * 20;
                }
            }

        }

    }
}
