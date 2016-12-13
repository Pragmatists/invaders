(function () {
    MyGame.Levels = function (game) {
        
        var level = 1;
        var points = 0;
        var threshold = 32;
        var sprintCompleted;

        var events = new MyGame.EventDispatcher();
        
        events.register('scored', function (score) {
            update(score)
        });

        var update = function (value) {
            
            points += value;
            
            if(points >= threshold) {

                sprintCompleted = game.add.image(game.world.centerX,game.world.centerY, 'text-sprint');
                sprintCompleted.anchor.setTo(0.5, 0.5);
                sprintCompleted.scale.setTo(0.5, 0.5);
                game.time.events.add(Phaser.Timer.SECOND * 2, hideSprintCompleted, this);
                
                points = 0;
                level += 1;
                threshold *= 2;
                
                events.dispatch('next-level', ++level);
            }
            
        };
        
        function hideSprintCompleted(){
            sprintCompleted.destroy();
        }

    };

})();