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

        EventDispatcher.prototype.reset = function () {
            events = {};
        };

        EventDispatcher.prototype.register = function (event, listener) {
            events[event] = events[event] || [];
            events[event].push(listener);
        };
        EventDispatcher.prototype.dispatch = function (event, params) {
            var listeners = events[event] || [];
            listeners.forEach(function(l){
                l(params);
            });
        };
        return EventDispatcher;
    })();

})();