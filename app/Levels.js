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

            if (points >= threshold) {

                showSprintCompleted(game);

                points = 0;
                level += 1;
                threshold *= 2;
                events.dispatch('next-level', ++level);
            }

        };

        function showSprintCompleted(game) {
            sprintCompleted = game.add.image(game.world.centerX, game.world.centerY, 'text-sprint');
            sprintCompleted.anchor.setTo(0.5, 0.5);
            sprintCompleted.scale.setTo(0.5, 0.5);
            var timer = game.time.create(false);
            timer.loop(1000, function () {
                sprintCompleted.destroy();
            }, this);
            timer.start();
        }

    };

})();