/// <reference path="Page.ts" />
var main;
(function (main) {
    var Book = (function () {
        function Book() {
            var _this = this;
            this.pages = new Array(); //array contendo as páginas
            //adiciona página ao livro
            this.addPage = function (page) {
                _this.pages.push(page);
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
            this.load = function () {
                main.ctx.fillStyle = "white";
                main.ctx.fillRect(0, 0, 1280, 720);
                _this.pages[_this.currentPage].load(); //carregamento das imagens da página
                requestAnimationFrame(_this.load);
            };
            //
            this.changePage = function (numberPage) {
                var page = _this.pages[_this.currentPage];
                var soundArray = page.getSons();
                //encerra todos os audios que tiver tocando
                soundArray.forEach(function (som) {
                    som.EncerrarAudio();
                });
                _this.currentPage = numberPage;
                _this.load();
            };
            this.currentPage = 0;
        }
        return Book;
    })();
    main.Book = Book;
    main.book = new Book(); // variavel do tipo livro
})(main || (main = {}));
//# sourceMappingURL=Book.js.map