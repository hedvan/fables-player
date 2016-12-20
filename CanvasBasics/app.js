var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var main;
(function (main) {
    //Variaveis globais
    var canvas;
    var ctx;
    //
    var Book = (function () {
        function Book() {
            var _this = this;
            this.pages = new Array(); //array contendo as páginas
            //adiciona página ao livro
            this.addPage = function (page) {
                _this.pages.push(page);
            };
            //retorna página atual
            this.getPage = function () {
                return _this.currentPage;
            };
            //seta a página atual
            this.setPage = function (value) {
                _this.currentPage = value;
            };
            //carrega a página
            this.load = function () {
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, 1280, 720);
                _this.pages[_this.currentPage].load(); //carregamento das imagens da página
                requestAnimationFrame(_this.load);
            };
            //
            this.getCurrentPage = function () {
                return _this.pages[_this.currentPage];
            };
            this.currentPage = 0;
        }
        return Book;
    })();
    var book = new Book(); // variavel do tipo livro
    //
    //
    var Page = (function () {
        function Page(id) {
            var _this = this;
            this.imagens = new Array(); //imagens presente na página
            this.sons = new Array(); //audios presentes na página
            //carrega os elementos da página na tela
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
    //
    //
    var Media = (function () {
        function Media(id) {
            this.id = id;
        }
        return Media;
    })();
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
    var ClickableImagem = (function (_super) {
        __extends(ClickableImagem, _super);
        function ClickableImagem(id, source, x, y, width, height) {
            var _this = this;
            _super.call(this, id, source, x, y, width, height);
            this.setAction = function (action, value) {
                _this.action = action;
                _this.value = value;
            };
            this.mouseDown = function (event) {
                if (_this.layer === book.getPage())
                    _this.activate = true;
            };
            this.mouseUp = function (event) {
                var x = event.x - canvas.offsetLeft;
                var y = event.y - canvas.offsetTop;
                if ((_this.x < x) && (x < (_this.x + _this.width)) &&
                    (_this.y < y) && (y < (_this.y + _this.height))) {
                    if (_this.activate === true) {
                        _this.activate = false;
                        if (_this.action == "ir para")
                            _this.change(book, _this.value);
                        if (_this.action == "tocar") {
                            _this.playOnclick();
                        }
                    }
                }
            };
            this.setLayer = function (value) {
                _this.layer = value;
            };
            this.change = function (book, numberPage) {
                //retorne a page
                var page = book.getCurrentPage();
                var soundArray = page.getSons();
                soundArray.forEach(function (som) {
                    som.EncerrarAudio();
                });
                //
                book.setPage(numberPage);
                book.load();
            };
            this.playOnclick = function () {
                //se a pessoa mandar um array de audios
                if (_this.value instanceof Array) {
                    _this.value.forEach(function (som) {
                        if (som.getImageBind() === _this.id) {
                            som.ReproduzirAudio();
                        }
                    });
                }
                else {
                    _this.value.ReproduzirAudio();
                }
            };
            canvas.addEventListener("mousedown", this.mouseDown, false);
            canvas.addEventListener("mouseup", this.mouseUp, false);
        }
        return ClickableImagem;
    })(Imagem);
    // Tipo Som //
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
                    _this.media.currentTime = 85;
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
    var ClickAudio = (function (_super) {
        __extends(ClickAudio, _super);
        function ClickAudio(id, source) {
            var _this = this;
            _super.call(this, id, source);
            this.ReproduzirAudio = function () {
                if (_this.media.currentTime == 0 && !ClickAudio.isPlaying) {
                    _this.media.currentTime = 85;
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
            this.getImageBind = function () {
                return _this.ImageBind;
            };
            this.setImageBind = function (value) {
                _this.ImageBind = value;
            };
        }
        ClickAudio.isPlaying = false;
        return ClickAudio;
    })(Sound);
    var scene = new Array();
    window.onload = function () {
        canvas = document.getElementById("myCanvas");
        ctx = canvas.getContext("2d");
        for (var i = 0; i < 3; i++) {
            var page = scene[i]();
            book.addPage(page);
        }
        book.load();
    };
    scene[0] = function () {
        var bg = new ClickAudio("teste", "media/bg.mp3");
        bg.setImageBind("dory");
        var page1 = new Page(0);
        page1.sonsPush(bg);
        var teste = new ClickableImagem("dory", "https://pbs.twimg.com/profile_images/773917612648591365/hFl6DSSh.jpg", 100, 100, 226, 300);
        teste.setAction("ir para", 1);
        page1.imagemPush(teste);
        var teste1 = new ClickableImagem("dory", "https://pbs.twimg.com/profile_images/773917612648591365/hFl6DSSh.jpg", 700, 100, 226, 300);
        teste1.setAction("tocar", page1.getSons());
        page1.imagemPush(teste1);
        var crane = new ClickAudio("crane", "media/cranes.mp3");
        crane.setImageBind("eleanor");
        page1.sonsPush(crane);
        var noite = new ClickableImagem("eleanor", "https://pbs.twimg.com/profile_images/773917612648591365/hFl6DSSh.jpg", 400, 400, 226, 300);
        noite.setAction("tocar", page1.getSons());
        page1.imagemPush(noite);
        return page1;
    };
    scene[1] = function () {
        var page2 = new Page(1);
        var teste2 = new ClickableImagem("dory", "https://pbs.twimg.com/profile_images/773917612648591365/hFl6DSSh.jpg", 120, 120, 226, 300);
        teste2.setAction("ir para", 2);
        page2.imagemPush(teste2);
        var teste22 = new ClickableImagem("dory", "https://pbs.twimg.com/profile_images/773917612648591365/hFl6DSSh.jpg", 500, 200, 226, 300);
        teste22.setAction("ir para", 0);
        page2.imagemPush(teste22);
        return page2;
    };
    scene[2] = function () {
        var page3 = new Page(2);
        var teste3 = new ClickableImagem("dory", "https://pbs.twimg.com/profile_images/773917612648591365/hFl6DSSh.jpg", 200, 120, 226, 300);
        teste3.setAction("ir para", 0);
        page3.imagemPush(teste3);
        return page3;
    };
})(main || (main = {}));
//# sourceMappingURL=app.js.map