// reference path=".\Scripts\typings\jquery\jquery.d.ts"/>

module Medias {
    export var book;
    export var canvas;
    export var ctx;

    export interface IBounds {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    export class Bounds {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    export class Figure extends Fables.Media {
        private property: Array<Bounds>;
        private layer: number;
        private pageBelongs: number;
        private antRefer: number;
        public onClick: onClick;

        constructor(id: string) {
            super(id);
            this.media = new Image();
            this.property = new Array<Bounds>();
        }

        //desenha a imagem
        public render(): void {
            var elem = this.property[this.pageBelongs];

            ctx.save();
            ctx.drawImage(this.media, elem.x, elem.y, elem.width, elem.height);
            ctx.restore();
        }
        
        public setLayer(value: number): void {
            this.layer = value;
        }

        public setUrl (value: string): void {
            this.media.src = value;
        }

        public setpageBelongs(value: number): void {
            this.pageBelongs = value;
        }

        public getpageBelongs(): number {
            return this.pageBelongs;
        }

        public setBounds(value: IBounds): void{
            var element = this.property[this.pageBelongs] = new Bounds();
            element.x = value.x;
            element.y = value.y;
            element.width = value.width;
            element.height = value.height;

            this.onClick = new onClick(element, this.pageBelongs);
        }

        public getLayer(): number {
            return this.layer;
        }

        public getBounds(): Bounds {
            return this.property[this.pageBelongs];
        }
    }

    

    
    class onClick {
        private property: Bounds;
        private pageBelongs;

        constructor(prop: Bounds, belongs) {
            this.property = prop;
            this.pageBelongs = belongs;
        }

        //teste se as imagem exibidas pertecem a pagina atual
        private testLayer = (): boolean => {
            var result = (this.pageBelongs === book.getPageNumber());
            return result;
        }

        
        private testPosition = (x, y): boolean => {
            var flag = (this.property.x < x) && (x < (this.property.x + this.property.width)) &&
                (this.property.y < y) && (y < (this.property.y + this.property.height));

            return flag;
        }

        public exibirMsg = (msg: string): void => {
            var self = this;
            var layer;
            var flag = self.testPosition
            $("#myCanvas").mousedown(function (event) {
                layer = self.testLayer();
                
            });

            

            $("#myCanvas").mouseup(function (event) {
                var x = event.pageX - canvas.offsetLeft;
                var y = event.pageY - canvas.offsetTop;
                var flag = self.testPosition(x, y);
                if (layer && flag)
                    alert(msg);
                    
            });

        }

        public checaValorExibeMsg = (i: Item, value: any, msg: string, msg2?: string): void => {
            var self = this;
            var layer;
            $("#myCanvas").mousedown(function (event) {
                layer = self.testLayer();
            });

            $("#myCanvas").mouseup(function (event) {
                var x = event.pageX - canvas.offsetLeft;
                var y = event.pageY - canvas.offsetTop;
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
                    } else {
                        alert(msg2);
                    }
                }
            });
        }


        public checaValorExibeLabel = (i: Item, value: any, msg: string, x: number, y: number): void => {
            var self = this;
            var layer;
            $("#myCanvas").mousedown(function (event) {
                layer = self.testLayer();
            });

            $("#myCanvas").mouseup(function (event) {
                var x = event.pageX - canvas.offsetLeft;
                var y = event.pageY - canvas.offsetTop;
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
                        var page = book.getPage();
                        var label = page.addLabel(" ");
                        label.setMessage(msg);
                        label.setPosition(x, y);
                        label.setLayer(4);
                    }
                }
            });


        }

        public mudarValor = (obj: Item, value: any): void => {
            var self = this;
            var layer;
            $("#myCanvas").mousedown(function (event) {
                layer = self.testLayer();
            });

            $("#myCanvas").mouseup(function (event) {
                var x = event.pageX - canvas.offsetLeft;
                var y = event.pageY - canvas.offsetTop;
                var flag = self.testPosition(x, y);
                if (flag && layer) {
                    obj.setGettable(value);
                    console.log(obj);
                }
            });


        }

        public tocarAudio = (id: any): void => {
            var self = this;
            var layer;
            $("#myCanvas").mousedown(function (event) {
                layer = self.testLayer();
            });

            $("#myCanvas").mouseup(function (event) {
                var x = event.pageX - canvas.offsetLeft;
                var y = event.pageY - canvas.offsetTop;
                var flag = self.testPosition(x, y);
                if (flag && layer) {
                    console.log("dentro do tocar audio");
                    var sons = book.getPage().getSons();
                    sons.forEach(elem=> {
                        elem.verifyAudio();

                        if (elem.getId() == id)
                            elem.playAudio();
                        console.log("rodando");
                    })
                }
            });
        }

        public irParaPagina = (numberPage: number): void => {
            var self = this;
            var layer;
            $("#myCanvas").mousedown(function (event) {
                layer = self.testLayer();
            });

            $("#myCanvas").mouseup(function (event) {
                var x = event.pageX - canvas.offsetLeft;
                var y = event.pageY - canvas.offsetTop;
                var flag = self.testPosition(x, y);
                if (flag && layer) {
                    book.changePage(numberPage);
                }
            });

        }

        public verdadeiroMudarImg = (i: Figure, value: string, k: Item): void => {
            var self = this;
            var layer;
            $("#myCanvas").mousedown(function (event) {
                layer = self.testLayer();
            });

            $("#myCanvas").mouseup(function (event) {
                var x = event.pageX - canvas.offsetLeft;
                var y = event.pageY - canvas.offsetTop;
                var flag = self.testPosition(x, y);
                if (flag && layer) {
                    if (k.getGettable()) {
                        i.setUrl(value);
                    }
                }
            });
        }

        public checaValorMudadePagina = (i: Item, value: any, numberPage: number): void => {
            var self = this;
            var layer;
            $("#myCanvas").mousedown(function (event) {
                layer = self.testLayer();
            });

            $("#myCanvas").mouseup(function (event) {
                var x = event.pageX - canvas.offsetLeft;
                var y = event.pageY - canvas.offsetTop;
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
                        book.changePage(numberPage);
                    }
                }
            });
        }


        public exibirLabel = (msg: string, x: number, y: number): void => {

            var self = this;
            var layer;
            $("#myCanvas").mousedown(function (event) {
                layer = self.testLayer();
            });

            $("#myCanvas").mouseup(function (event) {
                var x = event.pageX - canvas.offsetLeft;
                var y = event.pageY - canvas.offsetTop;
                var flag = self.testPosition(x, y);
                if (flag && layer) {
                    var page = book.getPage();
                    var label = page.addLabel(" ");
                    label.setMessage(msg);
                    label.setPosition(x, y);
                    label.setLayer(4);
                }
            });
        }
    }
}