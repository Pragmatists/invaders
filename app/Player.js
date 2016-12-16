(function () {
    var blip1;

    MyGame.Player = function (game) {

        this.bulletTime = 0;
        this.game = game;
        var that = this;
        blip1 = this.game.add.audio('blip');
        Phaser.Sprite.call(this, game, game.world.centerX, game.world.height - 100, 'ship');

        this.scale.setTo(0.3, 0.3);
        //player.scale.setTo(scaleRatio, scaleRatio); //http://www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/
        this.anchor.setTo(0.5, 0.5);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        this.body.setSize(160, 200, 0, 70);

        game.add.existing(this);

        this.bullets = this.game.add.group();
        //bullets.scale.setTo(scaleRatio, scaleRatio);
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(30, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.8);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);

    };

    MyGame.Player.prototype = Object.create(Phaser.Sprite.prototype);
    MyGame.Player.prototype.constructor = MyGame.Player;

    MyGame.Player.prototype.dead = function () {
        new MyGame.Explosions(this.game).explode(this);
        var mediumBoomSound = this.game.add.audio('mediumBoom');
        mediumBoomSound.play();
        this.kill();
    };

    MyGame.Player.prototype.move = function (velocity) {
        this.body.velocity.x = velocity;
    };

    MyGame.Player.prototype.stop = function () {
        this.body.velocity.x = 0;
    };

    MyGame.Player.prototype.getBullets = function () {
        return this.bullets;
    };

    MyGame.Player.prototype.fireBullet = function () {
        if (this.game.time.now > this.bulletTime) {

            var bullet = this.getBullets().getFirstExists(false);
            if (bullet) {
                bullet.reset(this.x, this.y + 8);
                bullet.body.velocity.y = -400;
                blip1.play();
                this.bulletTime = this.game.time.now + 200;
            }
        }
    };

})();






