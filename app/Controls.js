function Controls(game) {


    this.create = function () {
        this.pad = game.plugins.add(Phaser.VirtualJoystick);
        this.stick = this.pad.addStick(0, 0, 200, 'generic');
        this.stick.scale = 0.4;
        this.stick.alignBottomLeft(10);
        this.stick.motionLock = Phaser.VirtualJoystick.HORIZONTAL;

        this.buttonA = this.pad.addButton(500, 520, 'generic', 'button1-up', 'button1-down');
        this.buttonA.scale = 0.4;
        this.buttonA.alignBottomRight(10);
    };

    this.update = function (player) {
        if (this.stick.isDown)
        {
            player.body.velocity.x = this.stick.forceX * 400;
        }
        else
        {
            player.body.velocity.x = 0;
        }

        if (this.buttonA.isDown) {
            player.fireBullet();
        }

    };


}