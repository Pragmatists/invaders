(function () {
    MyGame.Alien = function (game, position) {

        Phaser.Sprite.call(this, game, position, 0, 'alien');
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.name = 'alien' + position.toString();
        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(resetElement, this);
        this.body.velocity.y = velocity();
        
        function velocity() {
            return 25 + Math.random() * 100;
        }

        function getRandom(min, max) {
            return Math.random() * (max - min) + min;
        }

        function newPosition(element) {
            return element.position.x + getRandom(-15,15);
        }

        function resetElement(element) {
            element.reset(newPosition(element), 0);
            element.body.velocity.y = velocity()+ MyGame.speed;
        }

        MyGame.Alien.prototype.explode = function () {
            new MyGame.Explosions(this.game).smallExplode(this);
            resetElement(this);
            new MyGame.EventDispatcher().dispatch("scored", 1);
        };

    };
    MyGame.Alien.prototype = Object.create(Phaser.Sprite.prototype);
    MyGame.Alien.prototype.constructor = MyGame.Alien;


})();