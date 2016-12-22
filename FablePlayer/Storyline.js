/// <reference path="app.ts" />
var main;
(function (main) {
    page[1] = function () {
        var item = {
            id: "max",
            source: "http://vignette3.wikia.nocookie.net/deadliestfiction/images/1/1a/Maxwell_Scribblenauts.png/revision/latest?cb=20130701014024",
            x: 100, y: 100,
            width: 200, height: 300
        };
        var imagem1 = new main.ElementImage(item);
        var item = {
            id: "luna",
            source: "http://vignette3.wikia.nocookie.net/scribblenauts/images/4/4c/ScribblenautMacho.png/revision/latest?cb=20130111184936&path-prefix=pt-br",
            x: 400, y: 400,
            width: 200, height: 300
        };
        var imagem2 = new main.ElementImage(item);
        function events() {
            requestAnimationFrame(events);
            clear(); //limpa o canvas
            imagem1.render();
            imagem2.render();
        }
        events();
    };
    page[2] = function () {
        var item = {
            id: "max",
            source: "http://vignette3.wikia.nocookie.net/deadliestfiction/images/1/1a/Maxwell_Scribblenauts.png/revision/latest?cb=20130701014024",
            x: 100, y: 500,
            width: 200, height: 300,
        };
        var imagem1 = new main.ElementImage(item);
        imagem1.activateDrag();
        var item = {
            id: "luna",
            source: "http://vignette3.wikia.nocookie.net/scribblenauts/images/4/4c/ScribblenautMacho.png/revision/latest?cb=20130111184936&path-prefix=pt-br",
            x: 400, y: 400,
            width: 200, height: 300,
        };
        var imagem2 = new main.ElementImage(item);
        imagem2.activateDrag();
        function events() {
            requestAnimationFrame(events);
            clear(); //limpa o canvas
            imagem1.y--;
            imagem1.render();
            imagem2.x--;
            imagem2.render();
        }
        events();
    };
})(main || (main = {}));
//# sourceMappingURL=Storyline.js.map