function Explosions(game) {
    this.game = game;


    function setupExploder(game) {
        game.anchor.x = 0.5;
        game.anchor.y = 0.5;

        game.animations.add('kaboom');
    }

    this.create = function () {
        this.explosions = this.game.add.group();
        this.explosions.createMultiple(30, 'kaboom');
        this.explosions.forEach(setupExploder, this.game);

        return this;
    };


    this.explode = function(element){
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(element.body.x, element.body.y);
        explosion.play('kaboom', 30, false, true);
    }


}