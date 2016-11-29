var ScoreBoard = function(game) {
    var scoreString = 'Story Points : ';
    var scoreText = game.add.text(10, 10, scoreString + MyGame.score, {
        font: '34px Arial',
        fill: '#fff'
    });

    ScoreBoard.prototype.update = function () {
        MyGame.score += 20;
        scoreText.text = scoreString + MyGame.score;
    };

};



