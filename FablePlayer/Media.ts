/// <reference path="Book.ts" />
/// <reference path="app.ts" />

module main {
    export abstract class Media {
        protected id: String;
        protected media: any;

        constructor(id: string) {
            this.id = id;
        }
    }

    // Tipo Imagem //
    export class Imagem extends Media {
        protected x: number;
        protected y: number;
        protected width: number;
        protected height: number;

        constructor(id: string, source: any, x: number, y: number, width: number, height: number) {
            super(id);
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.media = new Image();
            this.media.src = source;
        }

        //desenha a imagem
        render = (): void => {
            ctx.save();
            ctx.drawImage(this.media, this.x, this.y, this.width, this.height);
            ctx.restore();
        }

    }

    export class ClickableImagem extends Imagem {
        private activate: boolean;
        private layer: number;
        private isClick: boolean;

        constructor(id: string, source: any, x: number, y: number, width: number, height: number) {
            super(id, source, x, y, width, height);
        }

        public setLayer = (value: any): void => {
            this.layer = value;
        }

        public clicarTocarAudio = (_id: any): void => {
            var self = this;
            var id = _id;

            var mouseDown = function (event: MouseEvent) {
                var x: number = event.x - canvas.offsetLeft;
                var y: number = event.y - canvas.offsetTop;

                if ((self.x < x) && (x < (self.x + self.width)) &&
                    (self.y < y) && (y < (self.y + self.height)) &&
                    self.compare()) {

                    var sons = book.getPage().getSons();
                    //se a pessoa mandar um array de audios    
                        sons.forEach(som => {
                            
                            if (som.getId() === id) {
                                som.ReproduzirAudio();
                            }
                        })
                    
                }

            }

            canvas.addEventListener("mousedown", mouseDown, false);
        }

        public irParaPagina = (numberPage: number): void => {
            var self = this;
            var page = numberPage;
           
            function mouseDown() {
                if (self.layer === book.getPageNumber())
                    self.activate = true;         
            }
               
           function mouseUp(event: MouseEvent) {
               var x: number = event.x - canvas.offsetLeft;
               var y: number = event.y - canvas.offsetTop;

               if ((self.x < x) && (x < (self.x + self.width)) &&
                   (self.y < y) && (y < (self.y + self.height))) {
                   if (self.activate) {
                       self.activate = false;
                       book.changePage(page);
                   }
                }
            }

           canvas.addEventListener("mouseup", mouseUp, false);
           canvas.addEventListener("mousedown", mouseDown, false);
       }
        

        private compare = (): boolean => {
            //Se a camada da imagem é igual da página então ela é clicavel
            if (this.layer === book.getPageNumber()){
                return true;
            }
            return false;
        }
       
    }

}