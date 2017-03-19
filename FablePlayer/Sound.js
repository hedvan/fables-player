var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Medias;
(function (Medias) {
    var Sound = (function (_super) {
        __extends(Sound, _super);
        function Sound(id, source) {
            var _this = _super.call(this, id) || this;
            _this.playAudio = function () {
                if (_this.media.currentTime == 0 && !Sound.isPlaying) {
                    Sound.isPlaying = true;
                    _this.media.play();
                    console.log("toquei");
                }
            };
            _this.verifyAudio = function () {
                console.log("entre");
                if (_this.media.ended) {
                    Sound.isPlaying = false;
                    _this.media.currentTime = 0;
                    console.log("parei");
                }
            };
            _this.playAudioBackground = function () {
                if (_this.media.currentTime == 0 && !Sound.isPlaying) {
                    Sound.isPlaying = true;
                    _this.media.play();
                }
                if (_this.media.ended) {
                    Sound.isPlaying = false;
                    _this.media.currentTime = 0;
                    _this.playAudioBackground();
                }
            };
            _this.closeAudio = function () {
                _this.media.pause();
                _this.media.currentTime = 0;
                Sound.isPlaying = false;
            };
            _this.getId = function () {
                return _this.id;
            };
            _this.media = new Audio(source);
            return _this;
        }
        return Sound;
    }(Fables.Media));
    Sound.isPlaying = false;
    Medias.Sound = Sound;
})(Medias || (Medias = {}));
//# sourceMappingURL=Sound.js.map