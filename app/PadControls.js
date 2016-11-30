(function () {

    MyGame.PadControls = function (game) {
        var pad = game.plugins.add(Phaser.VirtualJoystick);

        var stick = pad.addStick(0, 0, 200, 'generic');
        stick.scale = 0.4;
        stick.alignBottomLeft(10);
        stick.motionLock = Phaser.VirtualJoystick.HORIZONTAL;

        var buttonA = pad.addButton(500, 520, 'generic', 'button1-up', 'button1-down');
        buttonA.scale = 0.4;
        buttonA.alignBottomRight(10);

//TODO this or out of function
        MyGame.PadControls.prototype.update = function () {
            if (stick.isDown) {
                var velocity = stick.forceX * 200;
                new MyGame.EventDispatcher().dispatch('controls-move', velocity);
            }
            else {
                new MyGame.EventDispatcher().dispatch('controls-move', 0);
            }

            if (buttonA.isDown) {
                new MyGame.EventDispatcher().dispatch('controls-fire');
            }

        };

        MyGame.PadControls.prototype.destroy = function () {
            pad.removeStick(stick);
            pad.removeButton(buttonA);
        };

    };

})();
