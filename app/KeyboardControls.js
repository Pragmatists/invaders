var KeyboardControls = function(game) {

    var cursors = game.input.keyboard.createCursorKeys();
    var fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    KeyboardControls.prototype.update = function () {

        if (fireButton.isDown) {
            new EventDispatcher().dispatch('controls-fire');
        }
        if (cursors.left.isDown) {
            new EventDispatcher().dispatch('controls-move', -200);
        }
        else if (cursors.right.isDown) {
            new EventDispatcher().dispatch('controls-move', 200);
        }

    };


};