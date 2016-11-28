function Starfield(game) {
    this.game = game;

    var width = 800 * window.devicePixelRatio;
    var height = 600 * window.devicePixelRatio;

    this.create = function () {
        this.starfield = this.game.add.tileSprite(this.game.world.centerX, this.game.world.centerY, width, height, 'space');
        this.starfield.anchor.set(0.5);
        return this;
    };

    this.scroll = function(){
        this.starfield.tilePosition.y += 2
    }


}