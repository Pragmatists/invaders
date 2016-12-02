describe('Event dispatcher', function () {

    var actionTriggered = false;
    var someAction = function () {
        actionTriggered = true;
    };

    it('should dispatch events to actions', function () {
        new EventDispatcher().register('trigger-event', someAction);

        new EventDispatcher().dispatch('trigger-event');

        expect(actionTriggered).toBeTruthy();
    });
});