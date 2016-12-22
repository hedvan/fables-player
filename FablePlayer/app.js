/// <reference path="Book.ts" />
var main;
(function (main) {
    var action = (function () {
        function action() {
            var _this = this;
            this.guardaAlgo = false;
            this.guardar = function (item) {
                _this.item = item;
                _this.guardaAlgo = true;
                alert("item foi guardado");
            };
            this.verificar = function () {
                if (_this.item != null) {
                    alert("este item tem algo guardado");
                }
                else {
                    alert("este item nao tem nada guardado");
                }
            };
            this.retirar = function () {
                if (_this.guardaAlgo) {
                    _this.guardaAlgo = false;
                    return _this.item;
                }
            };
        }
        return action;
    })();
    main.action = action;
    window.onload = function () {
        main.canvas = document.getElementById("myCanvas");
        main.ctx = main.canvas.getContext("2d");
        main.story();
        main.book.load();
    };
})(main || (main = {}));
//# sourceMappingURL=app.js.map