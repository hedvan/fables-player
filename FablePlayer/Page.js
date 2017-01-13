var Media_1 = require("./Media");
var Imagem = Media_1.medias.Imagem;
var ClickableImagem = Media_1.medias.ClickableImagem;
var mpage;
(function (mpage) {
    var Page = (function () {
        function Page(id) {
            var _this = this;
            this.imagens = new Array(); //imagens presente na página
            this.sons = new Array(); //audios presentes na página
            //carrega os elementos imagens da página na tela
            this.load = function () {
                _this.imagens.forEach(function (element) {
                    element.render();
                });
            };
            //seta a camada da imagem e adiciona ao vetor
            this.imagemPush = function (item) {
                if (item instanceof ClickableImagem) {
                    item.setLayer(_this.id);
                }
                _this.imagens.push(item);
            };
            this.sonsPush = function (item) {
                _this.sons.push(item);
            };
            this.getSons = function () {
                return _this.sons;
            };
            this.id = id;
        }
        return Page;
    })();
    mpage.Page = Page;
})(mpage = exports.mpage || (exports.mpage = {}));
//# sourceMappingURL=Page.js.map