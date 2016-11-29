function ScoreBoard(game) {

    var scoreString = '';
    var scoreText = {};

    this.create = function () {
        scoreString = 'Story Points : ';
        scoreText = game.add.text(10, 10, scoreString + MyGame.score, {
            font: '34px Arial',
            fill: '#fff'
        });
        return this;
    };

    this.update = function () {
        MyGame.score += 20;
        scoreText.text = scoreString + MyGame.score;
    };

}
