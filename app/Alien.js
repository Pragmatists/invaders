(function () {
    MyGame.Alien = function (game, idNumber) {

        var positions =[30,60,90,120,150,180,210,240,270,300];

        Phaser.Sprite.call(this, game, positions[idNumber], 0, 'alien');
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.name = idNumber;
        this.idNumber = idNumber;
        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(resetElement, this);
        this.body.velocity.y = velocity();

        function velocity() {
            return 25 + Math.random() * 100;
        }

        function resetElement(element) {
            element.reset(positions[element.idNumber], 0);
            element.body.velocity.y = velocity();
        }

        MyGame.Alien.prototype.explode = function () {
            new MyGame.Explosions(this.game).explode(this);
            resetElement(this);
        };

    };
    MyGame.Alien.prototype = Object.create(Phaser.Sprite.prototype);
    MyGame.Alien.prototype.constructor = MyGame.Alien;


})();