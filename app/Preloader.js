
var MyGame = {
	_WIDTH: 320,
	_HEIGHT: 480
};
MyGame.Preloader = function(game) {};
MyGame.Preloader.prototype = {
	preload: function() {
		this.load.image('button-start', 'assets/button-start.png');
		this.load.image('screen-howtoplay', 'assets/screen-howtoplay.png');
		this.load.image('space', 'assets/starfield.png');
		this.load.image('alien', 'assets/space-baddie.png');
		this.load.image('bonus', 'assets/carrot.png');
		this.load.image('bonus-medium', 'assets/melon.png');
		this.load.image('bonus-large', 'assets/pineapple.png');
		this.load.image('ship', 'assets/shmup-ship.png');
		this.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
		this.load.image('bullet', 'assets/bullet.png');
	},
	create: function() {
		this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.startFullScreen(true);
		this.game.state.start('MainMenu');
	}
};