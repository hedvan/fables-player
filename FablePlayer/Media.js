/// <reference path="Book.ts" />
/// <reference path="app.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var medias;
(function (medias) {
    var Media = (function () {
        function Media(id) {
            this.id = id;
        }
        return Media;
    })();
    medias.Media = Media;
    // Tipo Imagem //
    var Imagem = (function (_super) {
        __extends(Imagem, _super);
        function Imagem(id, source, x, y, width, height) {
            var _this = this;
            _super.call(this, id);
            //desenha a imagem
            this.render = function () {
                ctx.save();
                ctx.drawImage(_this.media, _this.x, _this.y, _this.width, _this.height);
                ctx.restore();
            };
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.media = new Image();
            this.media.src = source;
        }
        return Imagem;
    })(Media);
    medias.Imagem = Imagem;
    var ClickableImagem = (function (_super) {
        __extends(ClickableImagem, _super);
        function ClickableImagem(id, source, x, y, width, height) {
            var _this = this;
            _super.call(this, id, source, x, y, width, height);
            this.setLayer = function (value) {
                _this.layer = value;
            };
            this.clicarTocarAudio = function (_id) {
                var self = _this;
                var id = _id;
                var mouseDown = function (event) {
                    var x = event.x - canvas.offsetLeft;
                    var y = event.y - canvas.offsetTop;
                    if ((self.x < x) && (x < (self.x + self.width)) &&
                        (self.y < y) && (y < (self.y + self.height)) &&
                        self.compare()) {
                        var sons = book.getPage().getSons();
                        //se a pessoa mandar um array de audios    
                        sons.forEach(function (som) {
                            if (som.getId() === id) {
                                som.ReproduzirAudio();
                            }
                        });
                    }
                };
                canvas.addEventListener("mousedown", mouseDown, false);
            };
            this.irParaPagina = function (numberPage) {
                var self = _this;
                var page = numberPage;
                function mouseDown() {
                    if (self.layer === book.getPageNumber())
                        self.activate = true;
                }
                function mouseUp(event) {
                    var x = event.x - canvas.offsetLeft;
                    var y = event.y - canvas.offsetTop;
                    if ((self.x < x) && (x < (self.x + self.width)) &&
                        (self.y < y) && (y < (self.y + self.height))) {
                        if (self.activate) {
                            self.activate = false;
                            book.changePage(page);
                        }
                    }
                }
                canvas.addEventListener("mouseup", mouseUp, false);
                canvas.addEventListener("mousedown", mouseDown, false);
            };
            this.compare = function () {
                //Se a camada da imagem é igual da página então ela é clicavel
                if (_this.layer === book.getPageNumber()) {
                    return true;
                }
                return false;
            };
        }
        return ClickableImagem;
    })(Imagem);
    medias.ClickableImagem = ClickableImagem;
})(medias = exports.medias || (exports.medias = {}));
//# sourceMappingURL=Media.js.map