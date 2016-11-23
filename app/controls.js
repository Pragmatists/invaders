function Controls(game) {
    var leftPressed = false;
    var rightPressed = false;

    this.preload = function () {
        game.load.spritesheet('button', 'assets/button-round.png', 96, 96);
    };

    this.create = function () {
        var buttonLeft = game.add.button(20, 400, 'button', buttonLeftClick, this, 2, 1, 0);
        buttonLeft.events.onInputDown.add(function () {
            leftPressed = true;
            rightPressed = false;
        });

        buttonLeft.events.onInputUp.add(function () {
            leftPressed = false;
            rightPressed = false;
        });

        var buttonRight = game.add.button(700, 400, 'button', buttonRightClick, this, 2, 1, 0);
        buttonRight.events.onInputDown.add(function () {
            rightPressed = true;
            leftPressed = false;
        });

        buttonRight.events.onInputUp.add(function () {
            leftPressed = false;
            rightPressed = false;
        });
    };

    this.update = function (player) {
        console.log('update' +leftPressed+ " --"+rightPressed);
        if (leftPressed) {
            player.body.velocity.x = -200;
        }
        if(rightPressed){
            player.body.velocity.x = 200;
        }
    };

    function buttonLeftClick() {
        //
    }


    function buttonRightClick() {
        //
    }


}