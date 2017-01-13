var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var player;
(function (player) {
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
                player.ctx.fillStyle = "white";
                player.ctx.fillRect(0, 0, 1280, 720);
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
    player.Book = Book;
    player.book = new Book(); // variavel do tipo livro
    //
    //PAGE CLASS
    //
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
    player.Page = Page;
    //
    //MEDIA CLASS
    //
    var Media = (function () {
        function Media(id) {
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
                player.ctx.save();
                player.ctx.drawImage(_this.media, _this.x, _this.y, _this.width, _this.height);
                player.ctx.restore();
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
    player.Imagem = Imagem;
    //
    //  IMAGEMCLICAVEL CLASS
    //
    var ClickableImagem = (function (_super) {
        __extends(ClickableImagem, _super);
        function ClickableImagem(id, source, x, y, width, height) {
            var _this = this;
            _super.call(this, id, source, x, y, width, height);
            this.setLayer = function (value) {
                _this.layer = value;
            };
            this.clicarTocarAudio = function (_id) {
                var self = _this;
                var id = _id;
                var mouseDown = function (event) {
                    var x = event.x - player.canvas.offsetLeft;
                    var y = event.y - player.canvas.offsetTop;
                    if ((self.x < x) && (x < (self.x + self.width)) &&
                        (self.y < y) && (y < (self.y + self.height)) &&
                        self.compare()) {
                        var sons = player.book.getPage().getSons();
                        //se a pessoa mandar um array de audios    
                        sons.forEach(function (som) {
                            if (som.getId() === id) {
                                som.ReproduzirAudio();
                            }
                        });
                    }
                };
                player.canvas.addEventListener("mousedown", mouseDown, false);
            };
            this.irParaPagina = function (numberPage) {
                var self = _this;
                var page = numberPage;
                function mouseDown() {
                    if (self.layer === player.book.getPageNumber())
                        self.activate = true;
                }
                function mouseUp(event) {
                    var x = event.x - player.canvas.offsetLeft;
                    var y = event.y - player.canvas.offsetTop;
                    if ((self.x < x) && (x < (self.x + self.width)) &&
                        (self.y < y) && (y < (self.y + self.height))) {
                        if (self.activate) {
                            self.activate = false;
                            player.book.changePage(page);
                        }
                    }
                }
                player.canvas.addEventListener("mouseup", mouseUp, false);
                player.canvas.addEventListener("mousedown", mouseDown, false);
            };
            this.compare = function () {
                //Se a camada da imagem é igual da página então ela é clicavel
                if (_this.layer === player.book.getPageNumber()) {
                    return true;
                }
                return false;
            };
        }
        return ClickableImagem;
    })(Imagem);
    player.cimagem = ClickableImagem;
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
    player.Sound = Sound;
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
    player.BackgroundAudio = BackgroundAudio;
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
    player.ClickAudio = ClickAudio;
})(player || (player = {}));
//# sourceMappingURL=Player.js.map