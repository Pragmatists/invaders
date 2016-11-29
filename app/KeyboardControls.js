function KeyboardControls(game) {
    this.game = game;

    this.create = function () {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        return this;
    };

    this.update = function () {

        if (this.fireButton.isDown) {
            new EventDispatcher().dispatch('fire-button');
        }
        if (this.cursors.left.isDown) {
            new EventDispatcher().dispatch('controls-move', -200);
        }
        else if (this.cursors.right.isDown) {
            new EventDispatcher().dispatch('controls-move', 200);
        }

    };


}