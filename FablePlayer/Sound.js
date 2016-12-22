var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="Media.ts" />
var main;
(function (main) {
    // Tipo Som //
    var Sound = (function (_super) {
        __extends(Sound, _super);
        function Sound(id, source) {
            _super.call(this, id);
            this.ReproduzirAudio = function () { };
            this.media = new Audio(source);
        }
        return Sound;
    })(main.Media);
    main.Sound = Sound;
    var BackgroundAudio = (function (_super) {
        __extends(BackgroundAudio, _super);
        function BackgroundAudio(id, source) {
            var _this = this;
            _super.call(this, id, source);
            this.isPlaying = false;
            this.ReproduzirAudio = function () {
                if (_this.media.currentTime == 0 && !_this.isPlaying) {
                    _this.isPlaying = true;
                    _this.media.play();
                }
                if (_this.media.ended) {
                    _this.isPlaying = false;
                    _this.media.currentTime = 0;
                }
                setInterval(_this.ReproduzirAudio, 30, _this.media, _this.isPlaying);
            };
        }
        return BackgroundAudio;
    })(Sound);
    main.BackgroundAudio = BackgroundAudio;
    var ClickAudio = (function (_super) {
        __extends(ClickAudio, _super);
        function ClickAudio(id, source) {
            var _this = this;
            _super.call(this, id, source);
            this.ReproduzirAudio = function () {
                if (_this.media.currentTime == 0 && !ClickAudio.isPlaying) {
                    ClickAudio.isPlaying = true;
                    _this.media.play();
                }
                if (_this.media.ended) {
                    ClickAudio.isPlaying = false;
                    _this.media.currentTime = 0;
                }
            };
            this.EncerrarAudio = function () {
                _this.media.pause();
                _this.media.currentTime = 0;
                ClickAudio.isPlaying = false;
            };
            this.getId = function () {
                return _this.id;
            };
            this.setImageBind = function (value) {
                _this.ImageBind = value;
            };
        }
        ClickAudio.isPlaying = false;
        return ClickAudio;
    })(Sound);
    main.ClickAudio = ClickAudio;
})(main || (main = {}));
//# sourceMappingURL=Sound.js.map