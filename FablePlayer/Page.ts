module Fables {
    export class Page {
        private id: number //identificador da página
        private itens: Array<Media>;//imagens presente na página
        private totalLayer: number;

        constructor(id) {
            this.id = id;
            this.totalLayer = 1;
            this.itens = Array<Media>();
        }

        //carrega os elementos imagens da página na tela
        public load = (): void => {
            var index = 1;
            this.calculateTotalLayers();
            for (index = 1; index <= this.totalLayer; index++) {
                this.itens.forEach(element => {
                    if (element instanceof Medias.Figure)//encontra a imagem
                        if (element.getLayer() == index)//verifica a camada dela
                            element.render();
                    if (element instanceof Medias.Label)//encontra a imagem
                        if (element.getLayer() == index)//verifica a camada dela
                            element.render();
                    if (element instanceof Medias.Animation)
                        if (element.getLayer() == index)
                            element.render();
                })
            }
        }

        //adiciona um elemento imagem a página
        public addFigure = (id: string): Medias.Figure => {
            var figure: Medias.Figure = book.requestMedia(id);
            figure.setpageBelongs(this.id);
            this.itens.push(figure);
            return figure;
        }

        //adiciona um elemento label a página
        public addLabel = (id: string): Medias.Label => {
            var label = new Medias.Label(id);
            this.itens.push(label);
            return label;
        }

        //adiciona um elemento som a página
        public addSound = (id: string): Medias.Sound => {
            var sound = book.getMedia(id);
            console.log(sound);
            this.itens.push(sound);
            return sound;
        }

        public addAnimation(id: string): Medias.Animation {
            var animation: Medias.Animation = book.requestMedia(id);
            animation.setpageBelongs(this.id);
            this.itens.push(animation);
            return animation;
        }
        

        //calcula qual a maior camada
        private calculateTotalLayers = (): void => {
            this.itens.forEach(element => {
                if (element instanceof Medias.Figure || element instanceof Medias.Label)//encontra a imagem
                    if (element.getLayer() > this.totalLayer)//verifica qual a maior camada
                        this.totalLayer = element.getLayer();
            })
        }

        //gera um array de audios e retorna
        public getSons = (): any => {
            var elem = this.itens;
            var sons = new Array();
            console.log("getSom");
            for (var i = 0; i < elem.length; i++) {
                console.log(elem[i].getId());
                if (elem[i] instanceof Medias.Sound)
                    sons.push(elem[i]);
            }
            return sons;
        }

        //gera um array de audios e retorna
        public getAnimation = (id): any => {
            var elem = this.itens;
            var animation;
            for (var i = 0; i < elem.length; i++) {
                if (elem[i] instanceof Medias.Animation && elem[i].getId() === id)
                    return elem;
            }
        }

        public getItens = (): any => {
            return this.itens;
        }

        public getId = (): number => {
            return this.id;
        }
    }

    export abstract class Media {
        protected id: string;
        protected media: any;

        constructor(id: string) {
            this.id = id;
        }

        public getId = (): string => {
            return this.id;
        }
    }
}