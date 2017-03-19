
module Fables {
    var onClick = Events.onClick;

    export class Storyline {
        private book: Fables.Book;

        constructor(book) {
            this.book = book;
        };

        preload() {
            var book = this.book;
            book.add.figure("teste","Graphics/char1.png");
            book.add.animation("anim", "Graphics/walk.png");
            book.add.figure("door", "Graphics/DoorLocked.png");
            book.add.sound("teresis", "Graphics/montagne.mp3");
            book.add.var("var1",false);
        }

        Storyline() {
            var book = this.book;
            var page1 = book.newPage(1);
            var fig = page1.addFigure("teste");
            fig.setBounds({ x: 100, y: 100, width: 200, height:200 });
            fig.setLayer(3);
            fig.onClick.exibirMsg("funfou");

            var door = page1.addFigure("door");
            door.setBounds({ x: 500, y: 100, width: 80, height: 100 });
            door.setLayer(3);

            var anim = page1.addAnimation("anim");
            anim.setFrame(10);
            anim.setBounds({ x: 400, y: 400, width: 100, height: 120 });
            anim.setLayer(1);
            anim.setVelocity(5);
            anim.startInit(true);
            anim.loop(true);
            onClick({ item: "anim", action: "moveRight", param1: 800, param2:5 });
            onClick({ item: "anim", action: "checkPositionX", param1: 200, param2: "stop" });
            onClick({ item: "teste", action: "setValueVar", param1: "var1", param2: true });
            onClick({ item: "door", action: "checkItemPosX", param1: "anim", param2: 800, param3: "changePage", param4: 2 });
            onClick({ item: "door", action: "checkVarValue", param1: true, param2: "var1", param3: "showMessage", param4: "yes", param5: "no" });
            onClick({ item: "teste", action: "showLabel", param1: "tetrabolts", param2: 400, param3: 50 });
            onClick({ item: "teste", action: "playAudio", param1: "teresis" });
            onClick({ item: "teste", action: "changeImg", param1:"Graphics/zombie.png" });
        }
    }
}