// reference path=".\Scripts\typings\jquery\jquery.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var canvas;
var ctx;
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
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, 1280, 720);
            _this.pages[_this.currentPage].load(); //carregamento das imagens da página
            _this.pageAnimate = requestAnimationFrame(_this.load);
        };
        //
        this.changePage = function (numberPage) {
            var page = _this.pages[_this.currentPage];
            var Itens = page.getItens();
            //encerra todos os audios que tiver tocando
            Itens.forEach(function (elem) {
                if (elem instanceof ClickAudio) {
                    elem.EncerrarAudio();
                }
            });
            cancelAnimationFrame(_this.pageAnimate);
            _this.currentPage = numberPage;
            _this.load();
        };
        this.currentPage = 0;
    }
    return Book;
})();
var book = new Book(); // variavel do tipo livro
//
//PAGE CLASS
//
var Page = (function () {
    function Page(id) {
        var _this = this;
        this.itens = new Array(); //imagens presente na página
        //carrega os elementos imagens da página na tela
        this.load = function () {
            _this.itens.forEach(function (element) {
                if (element instanceof Label || element instanceof Animation
                    || element instanceof Imagem)
                    element.render();
            });
        };
        //seta a camada da imagem e adiciona ao vetor
        this.addElement = function (item) {
            var flag = true;
            _this.itens.forEach(function (element) {
                if (element.getId() === item.getId()) {
                    flag = false;
                }
            });
            if (flag) {
                if (item instanceof Imagem) {
                    item.setLayer(_this.id);
                }
                _this.itens.push(item);
            }
        };
        this.getSom = function (spec) {
            var elem = _this.itens;
            for (var i = 0; i < elem.length; i++) {
                if (elem[i] instanceof ClickAudio &&
                    elem[i].getId() === spec) {
                    return elem[i];
                }
            }
        };
        this.getItens = function () {
            return _this.itens;
        };
        this.id = id;
    }
    return Page;
})();
//
//MEDIA CLASS
//
var Media = (function () {
    function Media(id) {
        var _this = this;
        this.getId = function () {
            return _this.id;
        };
        this.id = id;
    }
    return Media;
})();
//
//Imagem CLASS
//
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
        this.setLayer = function (value) {
            _this.events.setLayer(value);
        };
        this.setSrc = function (value) {
            _this.media.src = value;
        };
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.media = new Image();
        this.media.src = source;
        this.events = new Events(x, y, width, height);
    }
    return Imagem;
})(Media);
//
//  IMAGEMCLICAVEL CLASS
//
//
//SOUND CLASS
//
var Sound = (function (_super) {
    __extends(Sound, _super);
    function Sound(id, source) {
        _super.call(this, id);
        this.ReproduzirAudio = function () { };
        this.media = new Audio(source);
    }
    return Sound;
})(Media);
var BackgroundAudio = (function (_super) {
    __extends(BackgroundAudio, _super);
    function BackgroundAudio(id, source) {
        var _this = this;
        _super.call(this, id, source);
        this.isPlaying = false;
        this.ReproduzirAudio = function () {
            if (_this.media.currentTime == 0 && !_this.isPlaying) {
                _this.isPlaying = true;
                _this.media.play();
            }
            if (_this.media.ended) {
                _this.isPlaying = false;
                _this.media.currentTime = 0;
            }
            setInterval(_this.ReproduzirAudio, 30, _this.media, _this.isPlaying);
        };
    }
    return BackgroundAudio;
})(Sound);
//
//  ClickAudio CLASS
//
var ClickAudio = (function (_super) {
    __extends(ClickAudio, _super);
    function ClickAudio(id, source) {
        var _this = this;
        _super.call(this, id, source);
        this.ReproduzirAudio = function () {
            if (_this.media.currentTime == 0 && !ClickAudio.isPlaying) {
                ClickAudio.isPlaying = true;
                _this.media.play();
            }
            if (_this.media.ended) {
                ClickAudio.isPlaying = false;
                _this.media.currentTime = 0;
            }
        };
        this.EncerrarAudio = function () {
            _this.media.pause();
            _this.media.currentTime = 0;
            ClickAudio.isPlaying = false;
        };
        this.getId = function () {
            return _this.id;
        };
        this.setImageBind = function (value) {
            _this.ImageBind = value;
        };
    }
    ClickAudio.isPlaying = false;
    return ClickAudio;
})(Sound);
//
//LABEL CLASS
//
var Label = (function (_super) {
    __extends(Label, _super);
    function Label(id, msg, x, y) {
        var _this = this;
        _super.call(this, id);
        this.render = function () {
            var cont = 0;
            var lines = _this.message.split("\n ");
            ctx.fillStyle = _this.color;
            ctx.font = _this.font;
            var fontsize = parseInt(ctx.font.substring(0, 2)) - 2;
            for (var i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], _this.x, _this.y + (fontsize * i));
            }
        };
        this.message = msg;
        this.x = x;
        this.y = y;
        this.font = "30px Arial";
        this.color = "black";
    }
    Label.prototype.setColor = function (value) {
        this.color = value;
    };
    Label.prototype.setFont = function (value) {
        this.font = value;
    };
    return Label;
})(Media);
//
//  ANIMATION CLASS
//
var Animation = (function (_super) {
    __extends(Animation, _super);
    function Animation(id, frames, x, y, w, h, src) {
        var _this = this;
        _super.call(this, id);
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 30;
        this.render = function () {
            console.log(_this.ticksPerFrame);
            ctx.drawImage(_this.media, _this.frameIndex * _this.width, 0, _this.width, _this.height, _this.x, _this.y, _this.width, _this.height);
            _this.Update();
        };
        this.Update = function () {
            _this.tickCount += 1;
            if (_this.tickCount > _this.ticksPerFrame) {
                _this.tickCount = 0;
                if (_this.frameIndex < _this.numberOfFrames - 1) {
                    _this.frameIndex += 1;
                }
                else {
                    _this.frameIndex = 0;
                }
            }
        };
        this.setVelocidade = function (value) {
            _this.ticksPerFrame = value;
        };
        this.media = new Image();
        this.media.src = src;
        this.numberOfFrames = frames;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.events = new Events(this.x, this.y, this.width, this.height);
    }
    return Animation;
})(Media);
//
//Events class
//
var Events = (function () {
    function Events(_x, _y, _w, _h) {
        var _this = this;
        this.setLayer = function (value) {
            _this.layer = value;
        };
        //teste se as imagem exibidas pertecem a pagina atual
        this.testLayer = function () {
            var result = (_this.layer === book.getPageNumber());
            return result;
        };
        this.aoClicar = function (func, value1, value2, value3, value4, value5) {
            var self = _this;
            var layer;
            $("#myCanvas").mousedown(function (event) {
                layer = self.testLayer();
            });
            $("#myCanvas").mouseup(function (event) {
                var x = event.pageX - canvas.offsetLeft;
                var y = event.pageY - canvas.offsetTop;
                if ((self.x < x) && (x < (self.x + self.w)) &&
                    (self.y < y) && (y < (self.y + self.h)) &&
                    layer) {
                    func(value1, value2, value3, value4, value5);
                }
            });
            return _this.action;
        };
        this.x = _x;
        this.y = _y;
        this.h = _h;
        this.w = _w;
        this.action = new Actions();
    }
    return Events;
})();
var Item = (function () {
    function Item(inicial) {
        var _this = this;
        this.setGettable = function (value) {
            _this.gettable = value;
        };
        this.getGettable = function () {
            return _this.gettable;
        };
        this.incrementGettable = function () {
            ++_this.gettable;
        };
        this.decrementGettable = function () {
            --_this.gettable;
        };
        this.gettable = inicial;
    }
    return Item;
})();
var Actions = (function () {
    function Actions() {
        this.exibirMsg = function (msg) {
            alert(msg);
        };
        this.checaValorExibeMsg = function (i, value, msg, msg2) {
            var flag = false;
            //como recebe diferente tipos verifica qual vai tratar
            //se for numero
            if (typeof (i.getGettable()) === "number") {
                if (i.getGettable() === value)
                    flag = true;
            }
            //se for string
            if (typeof (i.getGettable()) === "string") {
                if (i.getGettable() === value)
                    flag = true;
            }
            //se for boolean
            if (typeof (i.getGettable()) === "boolean") {
                if (i.getGettable() === value)
                    flag = true;
            }
            if (flag) {
                alert(msg);
            }
            else {
                alert(msg2);
            }
        };
        this.checaValorExibeLabel = function (i, value, page, label1, label2) {
            var flag = false;
            //como recebe diferente tipos verifica qual vai tratar
            //se for numero
            if (typeof (i.getGettable()) === "number") {
                if (i.getGettable() === value)
                    flag = true;
            }
            //se for string
            if (typeof (i.getGettable()) === "string") {
                if (i.getGettable() === value)
                    flag = true;
            }
            //se for boolean
            if (typeof (i.getGettable()) === "boolean") {
                if (i.getGettable() === value)
                    flag = true;
            }
            if (flag) {
                page.addElement(label1);
            }
            else {
                page.addElement(label2);
            }
        };
        this.mudarValor = function (obj, value) {
            obj.setGettable(value);
        };
        this.tocarAudio = function (id) {
            var som = book.getPage().getSom(id);
            som.ReproduzirAudio();
        };
        this.irParaPagina = function (numberPage) {
            book.changePage(numberPage);
        };
        this.verdadeiroMudarImg = function (i, value, k) {
            if (k.getGettable()) {
                i.setSrc(value);
            }
        };
        this.checaValorMudadePagina = function (i, value, numberPage) {
            var flag = false;
            //se for numero
            if (typeof (i.getGettable()) === "number") {
                if (i.getGettable() === value)
                    flag = true;
            }
            //se for string
            if (typeof (i.getGettable()) === "string") {
                if (i.getGettable() === value)
                    flag = true;
            }
            //se for boolean
            if (typeof (i.getGettable()) === "boolean") {
                if (i.getGettable() === value)
                    flag = true;
            }
            if (flag) {
                book.changePage(numberPage);
            }
        };
        this.incrementar = function (i) {
            //incrementa
            i.incrementGettable();
        };
        this.decrementar = function (i) {
            //incrementa
            i.decrementGettable();
        };
        this.exibirLabel = function (page, i) {
            page.addElement(i);
        };
    }
    return Actions;
})();
var actions = new Actions();
window.onload = function () {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    story();
    book.load();
};
function story() {
    //page1 - capa
    var page = new Page(0);
    var background = new Imagem("bg", "Media/BG.png", 0, 0, 1280, 720);
    page.addElement(background);
    var titulo = new Label("titulo", "O primeiro cavaleiro", 100, 200);
    titulo.setColor("black");
    titulo.setFont("120px Arial");
    page.addElement(titulo);
    var texto1 = new Label("texto1", "Encontre a chave \n nos arburtos \n para abrir a porta", 450, 400);
    texto1.setColor("black");
    texto1.setFont("40px Arial");
    page.addElement(texto1);
    var block = new Imagem("block", "Media/block.png", 0, 300, 438, 438);
    page.addElement(block);
    var block1 = new Imagem("block1", "Media/block.png", 800, 300, 438, 438);
    page.addElement(block1);
    var floor = new Imagem("floor", "Media/floor.jpg", 0, 600, 896, 128);
    page.addElement(floor);
    var floor1 = new Imagem("floor1", "Media/floor.jpg", 896, 600, 896, 128);
    page.addElement(floor1);
    var key = new Item(false); //para que a chave se torne um boolean
    var knight = new Animation("knight", 10, 540, 490, 100, 120, "Media/idle.png");
    knight.setVelocidade(4);
    knight.events.aoClicar(actions.exibirMsg, "olá eu sou o primeiro cavleiro");
    page.addElement(knight);
    var bush = new Imagem("bush", "Media/bush.png", 300, 560, 73, 46);
    bush.events.aoClicar(actions.mudarValor, key, true);
    bush.events.aoClicar(actions.exibirMsg, "você encontrou uma chave");
    page.addElement(bush);
    var bush1 = new Imagem("bush2", "Media/bush.png", 100, 560, 73, 46);
    bush1.events.aoClicar(actions.exibirMsg, "não tem nada aqui");
    page.addElement(bush1);
    var bush2 = new Imagem("bush3", "Media/bush.png", 300, 260, 73, 46);
    var box = new Imagem("box", "Media/box.png", 700, 520, 77, 77);
    bush2.events.aoClicar(actions.exibirMsg, "não tem nada aqui");
    page.addElement(bush2);
    var bush3 = new Imagem("bush4", "Media/bush.png", 900, 260, 73, 46);
    bush3.events.aoClicar(actions.exibirMsg, "não tem nada aqui");
    page.addElement(bush3);
    var bush4 = new Imagem("bush5", "Media/bush.png", 900, 560, 73, 46);
    bush4.events.aoClicar(actions.exibirMsg, "não tem nada aqui");
    page.addElement(bush4);
    var door = new Imagem("box", "Media/DoorLocked.png", 1000, 470, 70, 131);
    //door.events.checaValorExibeMsg(key, true, "aberto", "fechado");
    door.events.aoClicar(actions.checaValorExibeMsg, key, true, "aberto", "fechado");
    door.events.aoClicar(actions.checaValorMudadePagina, key, true, 1);
    page.addElement(door);
    book.addPage(page);
    //page 2 - caverna
    var page2 = new Page(1);
    //imagem de fundo
    var background2 = new Imagem("back2", "Media/cavernwall.png", 0, 0, 1536, 1344);
    page2.addElement(background2);
    //chao1
    var floor2 = new Imagem("floor2", "Media/floor2.png", 0, 600, 896, 128);
    page2.addElement(floor2);
    //chao2
    var floor23 = new Imagem("floor2435", "Media/floor2.png", 856, 600, 896, 128);
    page2.addElement(floor23);
    //porta aberta
    var dooropen = new Imagem("btn", "Media/DoorOpen.png", 100, 475, 70, 131);
    dooropen.events.aoClicar(actions.irParaPagina, 2);
    page2.addElement(dooropen);
    //contador da porta fechada
    var count = new Item(0);
    //o bulkhead é um botão que abre a porta
    var bulkhead1 = new Imagem("bulkead1", "Media/button.png", 900, 475, 30, 131);
    bulkhead1.events.aoClicar(actions.incrementar, count);
    bulkhead1.events.aoClicar(actions.checaValorExibeMsg, count, 3, "A porta foi aberta", "continue a apertar");
    page2.addElement(bulkhead1);
    //porta fechada
    var door1 = new Imagem("door1", "Media/DoorLocked.png", 1000, 470, 70, 131);
    //texto de ajuda
    var text2 = new Label("text2", "Aperte o botão até abrir a porta", 200, 100);
    //checa se os botoes foram clicados 3 vezes
    door1.events.aoClicar(actions.checaValorMudadePagina, count, 3, 3);
    door1.events.aoClicar(actions.exibirLabel, page2, text2);
    page2.addElement(door1);
    book.addPage(page2);
    //page 3 - sala que abre porta
    var page3 = new Page(2);
    var bg3 = new Imagem("desert", "Media/bg3.png", 0, 0, 1280, 720);
    page3.addElement(bg3);
    var dooropen1 = new Imagem("btn", "Media/DoorOpen.png", 200, 475, 70, 131);
    dooropen1.events.aoClicar(actions.irParaPagina, 1);
    page3.addElement(dooropen1);
    var floor31 = new Imagem("floor31", "Media/futuretile.png", 0, 630, 1350, 128);
    page3.addElement(floor31);
    var elixir = new Item(false);
    //caixas que esconderão o elixir
    var box1 = new Imagem("box1", "Media/box.png", 100, 100, 77, 77);
    box1.events.aoClicar(actions.exibirMsg, "não há nada nessa caixa");
    page3.addElement(box1);
    var box2 = new Imagem("box2", "Media/box.png", 600, 200, 77, 77);
    box2.events.aoClicar(actions.exibirMsg, "não há nada nessa caixa");
    page3.addElement(box2);
    var box3 = new Imagem("box3", "Media/box.png", 800, 500, 77, 77);
    box3.events.aoClicar(actions.exibirMsg, "você encontrou um elixir da vida");
    box3.events.aoClicar(actions.mudarValor, elixir, true);
    page3.addElement(box3);
    var box4 = new Imagem("box4", "Media/box.png", 900, 100, 77, 77);
    box4.events.aoClicar(actions.exibirMsg, "não há nada nessa caixa");
    page3.addElement(box4);
    //
    book.addPage(page3);
    //Page 4 - o encontro com o zumbi
    var page4 = new Page(3);
    var bg4 = new Imagem("graveyard", "Media/graveyard.png", 0, 0, 1280, 720);
    page4.addElement(bg4);
    var zombie = new Imagem("zombie", "Media/zombie.png", 800, 500, 107, 130);
    page4.addElement(zombie);
    var floor41 = new Imagem("floor41", "Media/futuretile.png", 0, 630, 1350, 128);
    page4.addElement(floor41);
    var label1 = new Label("label1", "Obrigado você me curou!!", 500, 500);
    label1.setColor("white");
    var label2 = new Label("label2", "AHHH você não me curou, \n vou comer seu cerebro", 500, 500);
    label2.setColor("white");
    zombie.events.aoClicar(actions.checaValorExibeLabel, elixir, true, page4, label1, label2);
    zombie.events.aoClicar(actions.verdadeiroMudarImg, zombie, "Media/char1.png", elixir);
    book.addPage(page4);
}
//# sourceMappingURL=app.js.map