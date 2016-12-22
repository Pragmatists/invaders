(function () {
    MyGame.Conditions = function (game) {

        const speedUpPerLevel = 40;

        var events = new MyGame.EventDispatcher();
        events.register('next-level', function () {
            updateGameSpeed()
        });

        var updateGameSpeed = function () {
            MyGame.speed += speedUpPerLevel;
        };

    };

})();