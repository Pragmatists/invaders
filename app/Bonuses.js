(function () {
    MyGame.Bonuses = function (game) {

        Phaser.Group.call(this, game);

        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;

        for (var x = 0; x < 2; x++) {
           this.add(new MyGame.Bonus(game,new MyGame.SmallBonus()));
        }

        for (var z = 0; z < 1; z++) {
            this.add(new MyGame.Bonus(game,new MyGame.MediumBonus()));
        }

        //for (var y = 0; y < 2; y++) {
        //    this.add(new MyGame.Bonus(game,new MyGame.LargeBonus()));
        //}

    };

    MyGame.Bonuses.prototype = Object.create(Phaser.Group.prototype);
    MyGame.Bonuses.prototype.constructor = MyGame.Bonuses;

})();