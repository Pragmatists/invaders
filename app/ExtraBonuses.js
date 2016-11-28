function ExtraBonuses(game) {
    this.game = game;
    function releaseBonus() {
        var bonus = this.bonuses.getFirstExists(false);
        if (bonus) {
            bonus.reset(game.world.randomX +20, 0);
            bonus.body.velocity.y = 25 + Math.random() * 50;
        }
    }

    this.create = function () {
        var x = Math.random() * (game.world.width - 50);
        this.bonuses = this.game.add.group();
        this.bonuses.enableBody = true;
        this.bonuses.physicsBodyType = Phaser.Physics.ARCADE;
        this.bonuses.createMultiple(30, 'star');
        this.bonuses.setAll('anchor.x', 0.5);
        this.bonuses.setAll('anchor.y', 1);
        this.bonuses.setAll('outOfBoundsKill', true);
        this.bonuses.setAll('checkWorldBounds', true);

        this.game.time.events.repeat(Phaser.Timer.SECOND * 10, 10, releaseBonus, this);
        return this.bonuses;
    };


}