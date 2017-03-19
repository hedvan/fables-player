var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Medias;
(function (Medias) {
    var Animation = (function (_super) {
        __extends(Animation, _super);
        function Animation(id, src) {
            var _this = _super.call(this, id) || this;
            _this.frameIndex = 0;
            _this.tickCount = 0;
            _this.ticksPerFrame = 30;
            _this.setBounds = function (value) {
                var element = _this.property[_this.pageBelongs] = new Medias.Bounds();
                element.x = value.x;
                element.y = value.y;
                element.width = value.width;
                element.height = value.height;
            };
            _this.setFrame = function (frames) {
                _this.numberOfFrames = frames;
            };
            _this.render = function () {
                var elem = _this.property[_this.pageBelongs];
                console.log("x:" + elem.x);
                Medias.ctx.drawImage(_this.media, _this.frameIndex * elem.width, 0, elem.width, elem.height, elem.x, elem.y, elem.width, elem.height);
                if (_this.start) {
                    _this.Update();
                }
            };
            _this.Update = function () {
                _this.tickCount += 1;
                if (_this.tickCount > _this.ticksPerFrame) {
                    _this.tickCount = 0;
                    if (_this.frameIndex < _this.numberOfFrames - 1) {
                        _this.frameIndex += 1;
                    }
                    else {
                        if (_this.looping)
                            _this.frameIndex = 0;
                    }
                }
            };
            _this.setVelocity = function (value) {
                _this.ticksPerFrame = value;
            };
            _this.setpageBelongs = function (value) {
                _this.pageBelongs = value;
            };
            _this.startInit = function (value) {
                _this.start = value;
            };
            _this.loop = function (value) {
                _this.looping = value;
            };
            _this.getpageBelongs = function () {
                return _this.pageBelongs;
            };
            _this.setLayer = function (value) {
                _this.layer = value;
            };
            _this.getLayer = function () {
                return _this.layer;
            };
            _this.getX = function () {
                var elem = _this.property[_this.pageBelongs];
                return elem.x;
            };
            _this.getY = function () {
                var elem = _this.property[_this.pageBelongs];
                return elem.y;
            };
            _this.setUrl = function (value) {
                _this.media.src = value;
            };
            _this.getUrl = function () {
                return _this.media.src;
            };
            _this.media = new Image();
            _this.media.src = src;
            _this.property = new Array();
            _this.start = false;
            return _this;
        }
        Animation.prototype.setX = function (value) {
            this.property[this.pageBelongs].x = value;
        };
        Animation.prototype.setY = function (value) {
            this.property[this.pageBelongs].y = value;
        };
        Animation.prototype.getBounds = function () {
            return this.property[this.pageBelongs];
        };
        return Animation;
    }(Fables.Media));
    Medias.Animation = Animation;
})(Medias || (Medias = {}));
//# sourceMappingURL=Animation.js.map