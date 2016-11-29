var Bonuses = function(game) {

    Phaser.Group.call(this, game);

    //bonuses.scale.setTo(scaleRatio, scaleRatio);
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;


    for (var x = 0; x < 6; x++) {
        var bonus = this.create(Math.random() * (this.game.world.width - 50), 0, 'bonus');
        bonus.name = 'bonus' + x.toString();
        bonus.checkWorldBounds = true;
        bonus.events.onOutOfBounds.add(resetElement, this);
        bonus.body.velocity.y = 25 + Math.random() * 100;
    }

    for (var z = 0; z < 4; z++) {
        var mediumBonus = this.create(Math.random() * (this.game.world.width - 50), 0, 'bonus-medium');
        mediumBonus.name = 'bonus' + z.toString();
        mediumBonus.checkWorldBounds = true;
        mediumBonus.events.onOutOfBounds.add(resetElement, this);
        mediumBonus.body.velocity.y = 25 + Math.random() * 150;
    }

    for (var y = 0; y < 2; y++) {
        var bigBonus = this.create(Math.random() * (this.game.world.width - 50), 0, 'bonus-large');
        bigBonus.name = 'bonus' + y.toString();
        bigBonus.checkWorldBounds = true;
        bigBonus.events.onOutOfBounds.add(resetElement, this);
        bigBonus.body.velocity.y = 25 + Math.random() * 180;
    }


    function resetElement(element) {
        element.reset(50 + Math.random() * (game.world.width - 50), 0);
        element.body.velocity.y = 25 + Math.random() * 40;
    }

};

Bonuses.prototype = Object.create(Phaser.Group.prototype);
Bonuses.prototype.constructor = Bonuses;