function ScoreBoard(game) {

    var score = 0;
    var scoreString = '';
    var scoreText = {};

    this.create = function () {
        //  The score
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
