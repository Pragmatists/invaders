(function () {
    MyGame.Preloader = function (game) {
    };
    MyGame.Preloader.prototype = {
        preload: function () {

            this.load.spritesheet('button-start', 'assets/button-start.png', 146, 51);
            this.load.image('screen-howtoplay', 'assets/screen-howtoplay.png');
            this.load.image('space', 'assets/starfield.png');
            this.load.image('alien', 'assets/space-baddie.png');
            this.load.image('bonus', 'assets/carrot.png');
            this.load.image('star', 'assets/star.png');
            this.load.image('bonus-medium', 'assets/melon.png');
            this.load.image('bonus-large', 'assets/pineapple.png');
            this.load.image('ship', 'assets/shmup-ship.png');
            this.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
            this.load.image('bullet', 'assets/bullet.png');
            this.load.atlas('generic', 'assets/joystick/skins/generic-joystick.png', 'assets/joystick/skins/generic-joystick.json');

            this.load.audio('smallBoom', 'assets/audio/smallBoom.wav');
            this.load.audio('mediumBoom', 'assets/audio/mediumBoom.wav');
            this.load.audio('collect', 'assets/audio/collect.wav');
            this.load.audio('blip', 'assets/audio/blip1.wav');
        },
        create: function () {
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.startFullScreen(true);
            this.game.physics.setBoundsToWorld();

            this.game.state.start('MainMenu');
        }
    };

})();