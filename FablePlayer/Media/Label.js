var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Medias;
(function (Medias) {
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label(id) {
            var _this = _super.call(this, id) || this;
            _this.render = function () {
                var cont = 0;
                var lines = _this.media.split("\n");
                Medias.ctx.fillStyle = _this.color;
                Medias.ctx.font = _this.font;
                var fontsize = parseInt(Medias.ctx.font.substring(0, 2)) - 2;
                for (var i = 0; i < lines.length; i++) {
                    Medias.ctx.fillText(lines[i], _this.X, _this.Y + (fontsize * i));
                }
            };
            _this.setColor = function (value) {
                _this.color = value;
            };
            _this.setFont = function (value) {
                _this.font = value;
            };
            _this.setPosition = function (x, y) {
                _this.X = x;
                _this.Y = y;
            };
            _this.setMessage = function (msg) {
                _this.media = msg;
            };
            _this.setLayer = function (value) {
                _this.layer = value;
            };
            _this.getLayer = function () {
                return _this.layer;
            };
            _this.font = "30px Arial";
            _this.color = "black";
            return _this;
        }
        return Label;
    }(Fables.Media));
    Medias.Label = Label;
})(Medias || (Medias = {}));
//# sourceMappingURL=Label.js.map