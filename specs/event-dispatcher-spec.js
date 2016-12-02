describe('Event dispatcher', function () {

    var actionTriggered, otherActionTriggered;

    var someAction = function () {
        actionTriggered = true;
    };

    var otherAction = function () {
        otherActionTriggered = true;
    };

    beforeEach(function () {
        actionTriggered = false;
        otherActionTriggered = false;
    });

    it('should dispatch events to actions', function () {
        new MyGame.EventDispatcher().register('trigger-event', someAction);

        new MyGame.EventDispatcher().dispatch('trigger-event');

        expect(actionTriggered).toBeTruthy();
    });

    it('should dispatch events to many actions', function () {
        new MyGame.EventDispatcher().register('trigger-event', someAction);
        new MyGame.EventDispatcher().register('trigger-event', otherAction);

        new MyGame.EventDispatcher().dispatch('trigger-event');

        expect(actionTriggered).toBeTruthy();
        expect(otherActionTriggered).toBeTruthy();
    });


});