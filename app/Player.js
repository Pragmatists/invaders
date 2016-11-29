Player = function (game, explosions) {

    this.explosions = explosions;
    this.bulletTime = 0;
    this.game = game;
    var that = this;

    Phaser.Sprite.call(this, game, game.world.centerX, game.world.height - 100, 'ship');

    //player.scale.setTo(scaleRatio, scaleRatio); //http://www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/
    this.anchor.setTo(0.5, 0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;

    game.add.existing(this);

    new EventDispatcher().register('fire-button', function () {
        that.fireBullet();
    });

    new EventDispatcher().register('controls-move', function (velocity) {
        that.move(velocity);
    });

    this.bullets = this.game.add.group();
    //bullets.scale.setTo(scaleRatio, scaleRatio);
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(30, 'bullet');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.dead = function () {
    this.explosions.explode(this);
    this.kill();
};

Player.prototype.move = function (velocity) {
    this.body.velocity.x = velocity;
};

Player.prototype.getBullets = function () {
    return this.bullets;
};

Player.prototype.fireBullet = function () {
    if (this.game.time.now > this.bulletTime) {

        var bullet = this.getBullets().getFirstExists(false);
        if (bullet) {
            bullet.reset(this.x, this.y + 8);
            bullet.body.velocity.y = -400;
            this.bulletTime = this.game.time.now + 200;
        }
    }
};






