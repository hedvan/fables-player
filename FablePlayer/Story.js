/// <reference path="Book.ts" />
/// <reference path="Page.ts" />
/// <reference path="Media.ts" />
/// <reference path="Sound.ts" />
var main;
(function (main) {
    function story() {
        //Sons
        var crane = new main.ClickAudio("crane", "Media/montagne.mp3");
        var bg = new main.ClickAudio("teste", "Media/audio1.mp3");
        //
        //page1
        var page1 = new main.Page(0);
        page1.sonsPush(bg);
        page1.sonsPush(crane);
        var teste = new main.ClickableImagem("dory", "Media/box.png", 100, 100, 226, 300);
        teste.irParaPagina(1);
        page1.imagemPush(teste);
        var teste1 = new main.ClickableImagem("dory", "Media/box.png", 700, 100, 226, 300);
        teste1.clicarTocarAudio("crane");
        page1.imagemPush(teste1);
        var noite = new main.ClickableImagem("eleanor", "Media/box.png", 400, 400, 226, 300);
        noite.clicarTocarAudio("teste");
        page1.imagemPush(noite);
        main.book.addPage(page1);
        //page 2
        var page2 = new main.Page(1);
        var teste2 = new main.ClickableImagem("dory", "Media/box.png", 120, 120, 226, 300);
        teste2.irParaPagina(2);
        page2.imagemPush(teste2);
        var teste22 = new main.ClickableImagem("dory", "Media/box.png", 500, 200, 226, 300);
        teste22.irParaPagina(0);
        page2.imagemPush(teste22);
        main.book.addPage(page2);
        //page 3
        var page3 = new main.Page(2);
        var teste3 = new main.ClickableImagem("dory", "Media/box.png", 200, 120, 226, 300);
        teste3.irParaPagina(0);
        page3.imagemPush(teste3);
        main.book.addPage(page3);
    }
    main.story = story;
})(main || (main = {}));
//# sourceMappingURL=Story.js.map