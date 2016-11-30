(function () {
    MyGame.KeyboardControls = function (game) {

        var cursors = game.input.keyboard.createCursorKeys();
        var fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        MyGame.KeyboardControls.prototype.update = function () {

            if (fireButton.isDown) {
                new  MyGame.EventDispatcher().dispatch('controls-fire');
            }
            if (cursors.left.isDown) {
                new  MyGame.EventDispatcher().dispatch('controls-move', -200);
            }
            else if (cursors.right.isDown) {
                new  MyGame.EventDispatcher().dispatch('controls-move', 200);
            }

        };


    };

})();