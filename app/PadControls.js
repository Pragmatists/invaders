function PadControls(game) {


    this.create = function () {
        this.pad = game.plugins.add(Phaser.VirtualJoystick);
        this.stick = this.pad.addStick(0, 0, 200, 'generic');
        this.stick.scale = 0.4;
        this.stick.alignBottomLeft(10);
        this.stick.motionLock = Phaser.VirtualJoystick.HORIZONTAL;

        this.buttonA = this.pad.addButton(500, 520, 'generic', 'button1-up', 'button1-down');
        this.buttonA.scale = 0.4;
        this.buttonA.alignBottomRight(10);
        return this;
    };

    this.update = function () {
        if (this.stick.isDown) {
            var velocity = this.stick.forceX * 200;
            new EventDispatcher().dispatch('controls-move', velocity);
        }
        else {
            new EventDispatcher().dispatch('controls-move', 0);
        }

        if (this.buttonA.isDown) {
            new EventDispatcher().dispatch('controls-fire');
        }

    };


}