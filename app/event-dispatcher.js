(function () {
    MyGame.EventDispatcher = (function () {
        var instance = null;
        var events = {};

        function EventDispatcher() {
            if (instance !== null) {
                return instance;
            }
            instance = this;
        }

        EventDispatcher.prototype.register = function (event, eventAction) {
            if(events[event]){
                events[event].push(eventAction);
            }else{
                events[event] = [eventAction];
            }
        };
        EventDispatcher.prototype.dispatch = function (event, params) {

            events[event].forEach(function(eventAction){
                eventAction(params);
            });

        };
        return EventDispatcher;
    })();

})();