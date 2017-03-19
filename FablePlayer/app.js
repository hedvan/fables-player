// reference path=".\Scripts\typings\jquery\jquery.d.ts"/>
var Fables;
(function (Fables) {
    var Add = (function () {
        function Add(array, array2) {
            this.medias = array;
            this.itens = array2;
        }
        Add.prototype.figure = function (id, source) {
            var figure = new Medias.Figure(id);
            figure.setUrl(source);
            this.medias.push(figure);
        };
        Add.prototype.sound = function (id, source) {
            var sound = new Medias.Sound(id, source);
            this.medias.push(sound);
        };
        Add.prototype.animation = function (id, source) {
            var animation = new Medias.Animation(id, source);
            this.medias.push(animation);
        };
        Add.prototype.var = function (id, value) {
            var item = new Medias.Item(id, value);
            this.itens.push(item);
        };
        return Add;
    }());
    var Book = (function () {
        function Book() {
            var _this = this;
            //cria uma página
            this.newPage = function (numberPage) {
                var page = new Fables.Page(numberPage);
                _this.pages[numberPage] = page;
                return page;
            };
            //retorna uma página para que seja feito algo com ela
            this.page = function (numberPage) {
                var page;
                _this.pages.forEach(function (elem) {
                    if (elem.getId() == numberPage)
                        page = elem;
                });
                return page;
            };
            //retorna página atual
            this.getPageNumber = function () {
                return _this.currentPage;
            };
            //retorna pagina atual
            this.getPage = function () {
                return _this.pages[_this.currentPage];
            };
            //carrega a página
            this.start = function () {
                Fables.ctx.fillStyle = "white";
                Fables.ctx.fillRect(0, 0, 1280, 720);
                Fables.ctx.save();
                _this.pages[_this.currentPage].load(); //carregamento das imagens da página
                Fables.ctx.restore();
                _this.pageAnimate = requestAnimationFrame(_this.start);
            };
            //
            this.changePage = function (numberPage) {
                var page = _this.pages[_this.currentPage];
                var Itens = page.getItens();
                //encerra todos os audios que tiver tocando
                Itens.forEach(function (elem) {
                    if (elem instanceof Medias.Sound) {
                        elem.closeAudio();
                    }
                });
                cancelAnimationFrame(_this.pageAnimate);
                _this.currentPage = numberPage;
                _this.start();
            };
            this.currentPage = 1;
            this.pages = new Array();
            this.add = new Add(this.medias = new Array(), this.itens = new Array());
        }
        Book.prototype.requestMedia = function (id) {
            var media;
            this.medias.forEach(function (elem) {
                if (elem.getId() === id) {
                    media = elem;
                }
            });
            return media;
        };
        Book.prototype.requestVar = function (id) {
            var item;
            this.itens.forEach(function (elem) {
                if (elem.getId() === id) {
                    item = elem;
                }
            });
            return item;
        };
        return Book;
    }());
    Fables.Book = Book;
})(Fables || (Fables = {}));
window.onload = function () {
    Fables.canvas = document.getElementById("myCanvas");
    Fables.ctx = Fables.canvas.getContext("2d");
    Fables.book = new Fables.Book();
    Medias.book = Fables.book;
    Medias.canvas = Fables.canvas;
    Medias.ctx = Fables.ctx;
    var story = new Fables.Storyline(Fables.book);
    story.preload();
    story.Storyline();
    Fables.book.start();
};
//# sourceMappingURL=app.js.map