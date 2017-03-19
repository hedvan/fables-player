var Events;
(function (Events) {
    var EventTest = (function () {
        function EventTest() {
            this.findAnimation = function (id) {
                var animation = Fables.book.requestMedia(id);
                return animation;
            };
            this.testLayer = function (media) {
                var result = (media.getpageBelongs() === Fables.book.getPageNumber());
                return result;
            };
            this.testPosition = function (x, y, property) {
                var flag = (property.x < x) && (x < (property.x + property.width)) &&
                    (property.y < y) && (y < (property.y + property.height));
                return flag;
            };
            this.findFunction = function (name) {
                if (name === "ShowMessage") {
                    return Events.showMessage;
                }
            };
        }
        return EventTest;
    }());
    Events.EventTest = EventTest;
})(Events || (Events = {}));
//# sourceMappingURL=EventTest.js.map