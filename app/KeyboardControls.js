(function () {
    MyGame.KeyboardControls = function (game) {

        var cursors = game.input.keyboard.createCursorKeys();
        var fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        MyGame.KeyboardControls.prototype.update = function (player) {

            if (fireButton.isDown) {
                player.fireBullet();
            }
            if (cursors.left.isDown) {
                player.move(-200);
            }
            else if (cursors.right.isDown) {
                player.move(200);
            }

        };


    };

})();