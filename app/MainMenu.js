MyGame.MainMenu = function(game) {};
MyGame.MainMenu.prototype = {
	create: function() {
		this.startButton = this.add.button(MyGame._WIDTH*0.5, 200, 'button-start', this.startGame, this, 2, 0, 1);
		this.startButton.anchor.set(0.5,0);
		this.startButton.input.useHandCursor = true;

	},
	startGame: function() {
		this.game.state.start('Howto');
	}
};