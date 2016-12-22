(function () {
    MyGame.Starfield = function (game) {

        var width = 800 * window.devicePixelRatio;
        var height = 600 * window.devicePixelRatio;

        var spaceBackground = game.add.tileSprite(game.world.centerX, game.world.centerY, width, height, 'space');
        spaceBackground.anchor.set(0.5);

        MyGame.Starfield.prototype.scroll = function () {
            spaceBackground.tilePosition.y += 2
        }

    };

})();