var Medias;
(function (Medias) {
    var Item = (function () {
        function Item(id, inicial) {
            var _this = this;
            this.setGettable = function (value) {
                _this.value = value;
            };
            this.getGettable = function () {
                return _this.value;
            };
            this.getId = function () {
                return _this.id;
            };
            this.id = id;
            this.value = inicial;
        }
        return Item;
    }());
    Medias.Item = Item;
})(Medias || (Medias = {}));
//# sourceMappingURL=Item.js.map