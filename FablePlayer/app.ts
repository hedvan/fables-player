// reference path=".\Scripts\typings\jquery\jquery.d.ts"/>

module Fables {
    export var canvas: HTMLCanvasElement;
    export var ctx: CanvasRenderingContext2D;
    export var book;

    class Add {
        private medias: Array<Media>;
        private itens: Array<Medias.Item>;

        constructor(array: Array<Media>, array2: Array<Medias.Item>) {
            this.medias = array;
            this.itens = array2;
        }

        figure(id:string, source:string) {
            var figure = new Medias.Figure(id);
            figure.setUrl(source);
            this.medias.push(figure);
        }

        sound(id: string, source:string) {
            var sound = new Medias.Sound(id, source);
            this.medias.push(sound);
        }

        animation(id:string, source:string) {
            var animation = new Medias.Animation(id, source);
            this.medias.push(animation);
        }

        var(id: string,value:any) {
            var item = new Medias.Item(id, value);
            this.itens.push(item);
        }
    }

    export class Book {
        private pages: Array<Page>;//array contendo as páginas
        private medias: Array<Media>;
        private itens: Array<Medias.Item>;
        private currentPage: number; // página atual
        private pageAnimate;
        add: Add;

        constructor() {
            this.currentPage = 1;
            this.pages = new Array<Page>();
            this.add = new Add(this.medias = new Array<Media>(), this.itens = new Array<Medias.Item>());
        }

        //cria uma página
        public newPage = (numberPage: number): Page => {

            var page: Page = new Page(numberPage);
            this.pages[numberPage] = page;
            return page;
        }

        //retorna uma página para que seja feito algo com ela
        public page = (numberPage: number): Page => {
            var page;
            this.pages.forEach(elem => {
                if (elem.getId() == numberPage)
                    page = elem;
            })
            return page;
        }

        //retorna página atual
        getPageNumber = (): number => {
            return this.currentPage;
        }

        //retorna pagina atual
        public getPage = () => {
            return this.pages[this.currentPage];
        }
        
        //carrega a página
        public start = (): void => {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, 1280, 720);
            ctx.save();
            this.pages[this.currentPage].load();//carregamento das imagens da página
            ctx.restore();
            this.pageAnimate = requestAnimationFrame(this.start);
        }
        
        
        //
        public changePage = (numberPage: number): void => {
            var page: Page = this.pages[this.currentPage];
            var Itens = page.getItens();
            //encerra todos os audios que tiver tocando
            Itens.forEach(elem => {
                if (elem instanceof Medias.Sound) {
                    elem.closeAudio();
                }
            })
            cancelAnimationFrame(this.pageAnimate);
            this.currentPage = numberPage;
            this.start();
        }

        public requestMedia(id: string):Media {
            var media;
            this.medias.forEach(elem => {
                if (elem.getId() === id) {
                    media = elem;
                }
            })
            return media;
        }

        public requestVar(id: string): Medias.Item {
            var item: Medias.Item;
            this.itens.forEach(elem => {
                if (elem.getId() === id) {
                    item = elem;
                }
            })
            return item;
        }
    }

    
}

window.onload = () => {
    Fables.canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
    Fables.ctx = Fables.canvas.getContext("2d");
    
    Fables.book = new Fables.Book();
    Medias.book = Fables.book;
    Medias.canvas = Fables.canvas;
    Medias.ctx = Fables.ctx;

    var story = new Fables.Storyline(Fables.book);
    story.preload();
    story.Storyline();
    Fables.book.start();
};