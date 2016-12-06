(function () {
    MyGame.Levels = function (game) {
        
        var level = 1;
        var points = 0;
        var threshold = 32;
        
        var events = new MyGame.EventDispatcher();
        
        var sprintCompleted = game.add.text(game.world.centerX, game.world.centerY, '', {
            font: '20px Arial',
            fill: '#fff'
        });
        sprintCompleted.anchor.x = 0.5;
        
        events.register('scored', function (score) {
            update(score)
        });

        var update = function (value) {
            
            points += value;
            
            if(points >= threshold) {
                
                sprintCompleted.text = 'Sprint ' + level + ' Completed!';
                game.time.events.add(Phaser.Timer.SECOND * 2, hideSprintCompleted, this);
                
                points = 0;
                level += 1;
                threshold *= 2;
                
                events.dispatch('next-level', ++level);
            }
            
        };
        
        function hideSprintCompleted(){
            sprintCompleted.text = '';
        }

    };

})();