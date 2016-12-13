(function () {
    MyGame.Preloader = function (game) {
    };
    MyGame.Preloader.prototype = {
        preload: function () {

            this.load.spritesheet('button-start', 'assets/button-start.png', 146, 51);
            this.load.spritesheet('button-facebook', 'assets/button-start.png', 146, 51);
            this.load.image('screen-howtoplay', 'assets/screen-howtoplay.png');
            this.load.image('space', 'assets/space.png');
//            this.load.image('alien', 'assets/space-baddie.png');
            this.load.image('alien', 'assets/bug.png');
//            this.load.image('bonus-small', 'assets/carrot.png');
            this.load.image('bonus-small', 'assets/story.png');
//            this.load.image('star', 'assets/star.png');
            this.load.image('star', 'assets/shield.png');
//            this.load.image('bonus-medium', 'assets/melon.png');
            this.load.image('bonus-medium', 'assets/epic.png');
//            this.load.image('bonus-large', 'assets/pineapple.png');
            this.load.image('bonus-large', 'assets/epic.png');
            this.load.image('ship', 'assets/ship.png');
//            this.load.image('ship', 'assets/shmup-ship.png');
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

        },
        create: function () {
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;

            this.game.physics.setBoundsToWorld();

            this.game.state.start('MainMenu');
        }
    };

})();