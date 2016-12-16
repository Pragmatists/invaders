(function () {
    MyGame.Bonus = function (game, type) {
        var x = position();
        Phaser.Sprite.call(this, game, x, 0, type.sprite());
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.name = 'bonus' + x.toString();
        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(resetElement, this);
        this.body.velocity.y = type.velocity();
        this.angle += 5;

        function getRandom(min, max) {
            return Math.random() * (max - min) + min;
        }

        function position() {
            return getRandom(50, game.world.width - 50);
        }

        function resetElement(element) {
            element.reset(position(), 0);
            element.body.velocity.y = type.velocity();
        }

        MyGame.Bonus.prototype.explode = function () {
            new MyGame.Explosions(this.game).smallExplode(this);
            resetElement(this);
        };

        MyGame.Bonus.prototype.collect = function () {
            var collect = game.add.audio('collect');
            collect.play();
            resetElement(this);
            new MyGame.EventDispatcher().dispatch("scored", type.points());
        };

    };
    MyGame.Bonus.prototype = Object.create(Phaser.Sprite.prototype);
    MyGame.Bonus.prototype.constructor = MyGame.Bonus;


    MyGame.SmallBonus = function () {
        this.velocity = function () {
            return 25 + Math.random() * 100;
        };

        this.sprite = function () {
            return "bonus-small";
        };

        this.points = function () {
            return 2;
        }

    };

    MyGame.MediumBonus = function () {
        this.velocity = function () {
            return 25 + Math.random() * 150;
        };

        this.sprite = function () {
            return "bonus-medium";
        };

        this.points = function () {
            return 3;
        }

    };

    MyGame.LargeBonus = function () {
        this.velocity = function () {
            return 25 + Math.random() * 180;
        };

        this.sprite = function () {
            return "bonus-large";
        };

        this.points = function () {
            return 5;
        }

    };

})();