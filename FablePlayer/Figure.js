// reference path=".\Scripts\typings\jquery\jquery.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Medias;
(function (Medias) {
    var Bounds = (function () {
        function Bounds() {
        }
        return Bounds;
    })();
    Medias.Bounds = Bounds;
    var Figure = (function (_super) {
        __extends(Figure, _super);
        function Figure(id) {
            _super.call(this, id);
            this.media = new Image();
            this.property = new Array();
        }
        //desenha a imagem
        Figure.prototype.render = function () {
            var elem = this.property[this.pageBelongs];
            Medias.ctx.save();
            Medias.ctx.drawImage(this.media, elem.x, elem.y, elem.width, elem.height);
            Medias.ctx.restore();
        };
        Figure.prototype.setLayer = function (value) {
            this.layer = value;
        };
        Figure.prototype.setUrl = function (value) {
            this.media.src = value;
        };
        Figure.prototype.setpageBelongs = function (value) {
            this.pageBelongs = value;
        };
        Figure.prototype.setBounds = function (value) {
            var element = this.property[this.pageBelongs] = new Bounds();
            element.x = value.x;
            element.y = value.y;
            element.width = value.width;
            element.height = value.height;
            this.onClick = new onClick(element, this.pageBelongs);
        };
        Figure.prototype.getLayer = function () {
            return this.layer;
        };
        return Figure;
    })(Fables.Media);
    Medias.Figure = Figure;
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
    Medias.Item = Item;
    var onClick = (function () {
        function onClick(prop, belongs) {
            var _this = this;
            //teste se as imagem exibidas pertecem a pagina atual
            this.testLayer = function () {
                var result = (_this.pageBelongs === Medias.book.getPageNumber());
                return result;
            };
            this.testPosition = function (x, y) {
                var flag = (_this.property.x < x) && (x < (_this.property.x + _this.property.width)) &&
                    (_this.property.y < y) && (y < (_this.property.y + _this.property.height));
                return flag;
            };
            this.exibirMsg = function (msg) {
                var self = _this;
                var layer;
                var flag = self.testPosition;
                $("#myCanvas").mousedown(function (event) {
                    layer = self.testLayer();
                });
                $("#myCanvas").mouseup(function (event) {
                    var x = event.pageX - Medias.canvas.offsetLeft;
                    var y = event.pageY - Medias.canvas.offsetTop;
                    var flag = self.testPosition(x, y);
                    if (layer && flag)
                        alert(msg);
                });
            };
            this.checaValorExibeMsg = function (i, value, msg, msg2) {
                var self = _this;
                var layer;
                $("#myCanvas").mousedown(function (event) {
                    layer = self.testLayer();
                });
                $("#myCanvas").mouseup(function (event) {
                    var x = event.pageX - Medias.canvas.offsetLeft;
                    var y = event.pageY - Medias.canvas.offsetTop;
                    var flag = self.testPosition(x, y);
                    if (flag && layer) {
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
                    }
                });
            };
            this.checaValorExibeLabel = function (i, value, msg, x, y) {
                var self = _this;
                var layer;
                $("#myCanvas").mousedown(function (event) {
                    layer = self.testLayer();
                });
                $("#myCanvas").mouseup(function (event) {
                    var x = event.pageX - Medias.canvas.offsetLeft;
                    var y = event.pageY - Medias.canvas.offsetTop;
                    var flag = self.testPosition(x, y);
                    if (flag && layer) {
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
                            var page = Medias.book.getPage();
                            var label = page.addLabel(" ");
                            label.setMessage(msg);
                            label.setPosition(x, y);
                            label.setLayer(4);
                        }
                    }
                });
            };
            this.mudarValor = function (obj, value) {
                var self = _this;
                var layer;
                $("#myCanvas").mousedown(function (event) {
                    layer = self.testLayer();
                });
                $("#myCanvas").mouseup(function (event) {
                    var x = event.pageX - Medias.canvas.offsetLeft;
                    var y = event.pageY - Medias.canvas.offsetTop;
                    var flag = self.testPosition(x, y);
                    if (flag && layer) {
                        obj.setGettable(value);
                        console.log(obj);
                    }
                });
            };
            this.tocarAudio = function (id) {
                var self = _this;
                var layer;
                $("#myCanvas").mousedown(function (event) {
                    layer = self.testLayer();
                });
                $("#myCanvas").mouseup(function (event) {
                    var x = event.pageX - Medias.canvas.offsetLeft;
                    var y = event.pageY - Medias.canvas.offsetTop;
                    var flag = self.testPosition(x, y);
                    if (flag && layer) {
                        console.log("dentro do tocar audio");
                        var sons = Medias.book.getPage().getSons();
                        sons.forEach(function (elem) {
                            elem.verifyAudio();
                            if (elem.getId() == id)
                                elem.playAudio();
                            console.log("rodando");
                        });
                    }
                });
            };
            this.irParaPagina = function (numberPage) {
                var self = _this;
                var layer;
                $("#myCanvas").mousedown(function (event) {
                    layer = self.testLayer();
                });
                $("#myCanvas").mouseup(function (event) {
                    var x = event.pageX - Medias.canvas.offsetLeft;
                    var y = event.pageY - Medias.canvas.offsetTop;
                    var flag = self.testPosition(x, y);
                    if (flag && layer) {
                        Medias.book.changePage(numberPage);
                    }
                });
            };
            this.verdadeiroMudarImg = function (i, value, k) {
                var self = _this;
                var layer;
                $("#myCanvas").mousedown(function (event) {
                    layer = self.testLayer();
                });
                $("#myCanvas").mouseup(function (event) {
                    var x = event.pageX - Medias.canvas.offsetLeft;
                    var y = event.pageY - Medias.canvas.offsetTop;
                    var flag = self.testPosition(x, y);
                    if (flag && layer) {
                        if (k.getGettable()) {
                            i.setUrl(value);
                        }
                    }
                });
            };
            this.checaValorMudadePagina = function (i, value, numberPage) {
                var self = _this;
                var layer;
                $("#myCanvas").mousedown(function (event) {
                    layer = self.testLayer();
                });
                $("#myCanvas").mouseup(function (event) {
                    var x = event.pageX - Medias.canvas.offsetLeft;
                    var y = event.pageY - Medias.canvas.offsetTop;
                    var flag = self.testPosition(x, y);
                    if (flag && layer) {
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
                            Medias.book.changePage(numberPage);
                        }
                    }
                });
            };
            this.exibirLabel = function (msg, x, y) {
                var self = _this;
                var layer;
                $("#myCanvas").mousedown(function (event) {
                    layer = self.testLayer();
                });
                $("#myCanvas").mouseup(function (event) {
                    var x = event.pageX - Medias.canvas.offsetLeft;
                    var y = event.pageY - Medias.canvas.offsetTop;
                    var flag = self.testPosition(x, y);
                    if (flag && layer) {
                        var page = Medias.book.getPage();
                        var label = page.addLabel(" ");
                        label.setMessage(msg);
                        label.setPosition(x, y);
                        label.setLayer(4);
                    }
                });
            };
            this.property = prop;
            this.pageBelongs = belongs;
        }
        return onClick;
    })();
})(Medias || (Medias = {}));
//# sourceMappingURL=Figure.js.map