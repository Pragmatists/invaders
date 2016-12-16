(function () {
    MyGame.ScoreBoard = function (game) {
        
        var style = {
            font: '20px Arial',
            fill: '#fff'
        };
        
        var score = 0;
        var sprint = 0;
        
        var totalScore = game.add.text(10, 10, 'Total: 0 SP', style);
        var sprintScore = game.add.text(game.world.width - 10, 10, 'Sprint: 0 SP', style);
        sprintScore.anchor.x = 1;
        
        var events = new MyGame.EventDispatcher();
        
        events.register('scored', function (score) {
            update(score)
        });
        events.register('next-level', function(){
            sprint = 0;
        });

        var update = function (value) {
            score += value;
            sprint += value;
            totalScore.text = 'Total: ' + score + ' SP';
            sprintScore.text = 'Sprint: ' + sprint + ' SP';
            MyGame.score = score;
        };

    };

})();



