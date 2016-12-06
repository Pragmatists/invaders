(function () {
    MyGame.Alien = function (game, position) {

        Phaser.Sprite.call(this, game, position, 0, 'alien');
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.name = 'alien' + position.toString();
        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(resetElement, this);
        this.body.velocity.y = velocity();

        this.scale.setTo(0.3, 0.3);
        
        function velocity() {
            return 25 + Math.random() * 100;
        }

        function resetElement(element) {
            element.reset(element.position.x, 0);
            element.body.velocity.y = velocity();
        }

        MyGame.Alien.prototype.explode = function () {
            new MyGame.Explosions(this.game).explode(this);
            resetElement(this);
            new MyGame.EventDispatcher().dispatch("scored", 1);
        };

    };
    MyGame.Alien.prototype = Object.create(Phaser.Sprite.prototype);
    MyGame.Alien.prototype.constructor = MyGame.Alien;


})();