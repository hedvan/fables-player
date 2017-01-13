/// <reference path="Book.ts" />
/// <reference path="Page.ts" />
/// <reference path="Media.ts" />
/// <reference path="Sound.ts" />
//module main {
/*historia teste
export function story() {
    //Sons
        var crane = new ClickAudio("crane", "Media/montagne.mp3");
        
        var bg = new ClickAudio("teste", "Media/audio1.mp3");
    //

    //page1
    

    var page1 = new Page(0);

    page1.sonsPush(bg);
    page1.sonsPush(crane);

    var teste = new ClickableImagem("dory", "Media/box.png",
        100, 100, 226, 300);

    teste.irParaPagina(1);
    page1.imagemPush(teste);
   

    var teste1 = new ClickableImagem("dory", "Media/box.png",
        700, 100, 226, 300);

    teste1.clicarTocarAudio("crane");
    page1.imagemPush(teste1);

    

    var noite = new ClickableImagem("eleanor", "Media/box.png",
        400, 400, 226, 300);
    noite.clicarTocarAudio("teste");
    page1.imagemPush(noite);

    book.addPage(page1);
    //page 2
    var page2 = new Page(1);

    var teste2 = new ClickableImagem("dory", "Media/box.png",
        120, 120, 226, 300);
    teste2.irParaPagina(2);
    page2.imagemPush(teste2);

    var teste22 = new ClickableImagem("dory", "Media/box.png",
        500, 200, 226, 300);
    teste22.irParaPagina(0);
    page2.imagemPush(teste22);
    
    book.addPage(page2);
    //page 3
    var page3 = new Page(2);

    var teste3 = new ClickableImagem("dory", "Media/box.png",
        200, 120, 226, 300);
    teste3.irParaPagina(0);
    page3.imagemPush(teste3);
    
    book.addPage(page3);
}
*/
/* historia do cavaleiro
export function story() {
    var page = new Page(0);

    var background = new Imagem("bg", "Media/BG.png", 0, 0, 1280, 720);
    page.imagemPush(background);

    var floor = new Imagem("floor", "Media/floor.jpg", 0, 600, 896, 128);
    var floor1 = new Imagem("floor", "Media/floor.jpg", 896, 600, 896, 128);
    page.imagemPush(floor);
    page.imagemPush(floor1);

    var knight = new Imagem("knight", "Media/char1.png", 100, 500, 130, 110);
    page.imagemPush(knight);

    var bush = new ClickableImagem("bush", "Media/bush.png", 400, 560, 73, 46);
    page.imagemPush(bush);
    bush.irParaPagina(1);

    
    var box = new ClickableImagem("box", "Media/box.png", 600, 540, 70, 70);
    
    box.clicarTocarAudio("teste");
    page.imagemPush(box);


    book.addPage(page);
    
    //page2

    var page2 = new Page(1);
    page2.imagemPush(floor);
    page2.imagemPush(knight);

    book.addPage(page2);
}
*/
//} 
//# sourceMappingURL=Story.js.map