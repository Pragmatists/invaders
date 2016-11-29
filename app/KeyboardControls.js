function KeyboardControls(game) {
    this.game = game;

    this.create = function () {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        return this;
    };

    this.update = function (player) {

        if (this.fireButton.isDown) {
            player.fireBullet();
        }
        if (this.cursors.left.isDown) {
            player.body.velocity.x = -200;
        }
        else if (this.cursors.right.isDown) {
            player.body.velocity.x = 200;
        }

    };


}