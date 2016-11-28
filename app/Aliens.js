function Aliens(game) {
    this.game = game;
    function resetElement(element) {
        element.reset(game.world.randomX, 0);
        element.body.velocity.y = 25 + Math.random() * 40;
    }

    this.create = function () {
        var aliens = this.game.add.group();

        aliens.enableBody = true;
        aliens.physicsBodyType = Phaser.Physics.ARCADE;

            for (var x = 0; x < 10; x++) {
                var alien = aliens.create(game.world.randomX, 0, 'alien');
                alien.name = 'alien' + x.toString();
                alien.checkWorldBounds = true;
                alien.events.onOutOfBounds.add(resetElement, this);
                alien.body.velocity.y = 25 + Math.random() * 100;
            }
        return aliens;
    };


}