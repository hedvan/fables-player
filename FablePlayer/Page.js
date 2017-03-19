var Fables;
(function (Fables) {
    var Page = (function () {
        function Page(id) {
            var _this = this;
            //carrega os elementos imagens da página na tela
            this.load = function () {
                var index = 1;
                _this.calculateTotalLayers();
                for (index = 1; index <= _this.totalLayer; index++) {
                    _this.itens.forEach(function (element) {
                        if (element instanceof Medias.Figure)
                            if (element.getLayer() == index)
                                element.render();
                        if (element instanceof Medias.Label)
                            if (element.getLayer() == index)
                                element.render();
                        if (element instanceof Medias.Animation)
                            if (element.getLayer() == index)
                                element.render();
                    });
                }
            };
            //adiciona um elemento imagem a página
            this.addFigure = function (id) {
                var figure = Fables.book.requestMedia(id);
                figure.setpageBelongs(_this.id);
                _this.itens.push(figure);
                return figure;
            };
            //adiciona um elemento label a página
            this.addLabel = function (id) {
                var label = new Medias.Label(id);
                _this.itens.push(label);
                return label;
            };
            //adiciona um elemento som a página
            this.addSound = function (id) {
                var sound = Fables.book.getMedia(id);
                console.log(sound);
                _this.itens.push(sound);
                return sound;
            };
            //calcula qual a maior camada
            this.calculateTotalLayers = function () {
                _this.itens.forEach(function (element) {
                    if (element instanceof Medias.Figure || element instanceof Medias.Label)
                        if (element.getLayer() > _this.totalLayer)
                            _this.totalLayer = element.getLayer();
                });
            };
            //gera um array de audios e retorna
            this.getSons = function () {
                var elem = _this.itens;
                var sons = new Array();
                console.log("getSom");
                for (var i = 0; i < elem.length; i++) {
                    console.log(elem[i].getId());
                    if (elem[i] instanceof Medias.Sound)
                        sons.push(elem[i]);
                }
                return sons;
            };
            //gera um array de audios e retorna
            this.getAnimation = function (id) {
                var elem = _this.itens;
                var animation;
                for (var i = 0; i < elem.length; i++) {
                    if (elem[i] instanceof Medias.Animation && elem[i].getId() === id)
                        return elem;
                }
            };
            this.getItens = function () {
                return _this.itens;
            };
            this.getId = function () {
                return _this.id;
            };
            this.id = id;
            this.totalLayer = 1;
            this.itens = Array();
        }
        Page.prototype.addAnimation = function (id) {
            var animation = Fables.book.requestMedia(id);
            animation.setpageBelongs(this.id);
            this.itens.push(animation);
            return animation;
        };
        return Page;
    }());
    Fables.Page = Page;
    var Media = (function () {
        function Media(id) {
            var _this = this;
            this.getId = function () {
                return _this.id;
            };
            this.id = id;
        }
        return Media;
    }());
    Fables.Media = Media;
})(Fables || (Fables = {}));
//# sourceMappingURL=Page.js.map