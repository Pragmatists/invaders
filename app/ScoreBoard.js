var ScoreBoard = function(game) {
    var scoreString = 'Story Points : ';
    var scoreText = game.add.text(10, 10, scoreString + MyGame.score, {
        font: '34px Arial',
        fill: '#fff'
    });

    new EventDispatcher().register('scored', function (score) {
        update(score)
    });

    var update = function (value) {
        MyGame.score += value;
        scoreText.text = scoreString + MyGame.score;
    };

};



