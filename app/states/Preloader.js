(function () {
    MyGame.Preloader = function (game) {
    };
    MyGame.Preloader.prototype = {
        preload: function () {

            this.load.image('space', 'assets/seamles_space.png');
            this.load.image('alien', 'assets/Bug50proc.png');
            this.load.image('bonus-small', 'assets/Story50proc.png');
            this.load.image('star', 'assets/shield-small.png');
            this.load.image('bonus-medium', 'assets/Epic50proc.png');
            this.load.image('bonus-large', 'assets/epic.png');
            this.load.image('ship', 'assets/ship.png');
            this.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
            this.load.image('bullet', 'assets/bullet.png');
            this.load.atlas('generic', 'assets/joystick/skins/generic-joystick.png', 'assets/joystick/skins/generic-joystick.json');

            this.load.audio('smallBoom', 'assets/audio/smallBoom.wav');
            this.load.audio('mediumBoom', 'assets/audio/mediumBoom.wav');
            this.load.audio('collect', 'assets/audio/collect.wav');
            this.load.audio('blip', 'assets/audio/blip1.wav');

            this.load.image('text-title', 'assets/texts/title.png');
            this.load.image('text-game-over', 'assets/texts/game-over.png');
            this.load.image('text-start-game', 'assets/texts/start-game.png');
            this.load.image('text-try-again', 'assets/texts/try-again.png');
            this.load.image('text-share', 'assets/texts/share.png');
            this.load.image('text-sprint', 'assets/texts/sprint-completed.png');
            this.load.image('how-to', 'assets/texts/how-to.png');

            this.load.image('howto1', 'assets/texts/howto/howto1.png');
            this.load.image('howto2', 'assets/texts/howto/howto2.png');
            this.load.image('howto3', 'assets/texts/howto/howto3.png');
            this.load.image('howto4', 'assets/texts/howto/howto4.png');
            this.load.image('howto5', 'assets/texts/howto/howto5.png');
            this.load.image('howto6', 'assets/texts/howto/howto6a.png');
            this.load.image('howto9', 'assets/texts/howto/howto9.png');
            this.load.image('howto10', 'assets/texts/howto/howto11.png');

            this.load.image('pragmatists', 'assets/texts/pragma.png');
            this.load.image('presents', 'assets/texts/presents-2016.png');

        },
        create: function () {
            if (this.game.device.desktop) {
                this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            } else {
                this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            }

            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;

            this.game.physics.setBoundsToWorld();

            this.game.state.start('Splash');
        }
    };

})();