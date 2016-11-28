function Aliens(game) {
    this.game = game;
    function resetElement(element) {
        element.reset(50 + Math.random() * (game.world.width - 50), 0);
        element.body.velocity.y = 25 + Math.random() * 40;
    }

    this.create = function () {
        var aliens = this.game.add.group();

        aliens.enableBody = true;
        aliens.physicsBodyType = Phaser.Physics.ARCADE;

        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 5; x++) {
                var alien = aliens.create(Math.random() * (this.game.world.width - 50), y * 50 + Math.random() * 10, 'alien');
                alien.name = 'alien' + x.toString() + y.toString();
                alien.checkWorldBounds = true;
                alien.events.onOutOfBounds.add(resetElement, this);
                alien.body.velocity.y = 25 + Math.random() * 100;
            }
        }
        return aliens;
    };


}