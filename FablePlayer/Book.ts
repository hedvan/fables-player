/// <reference path="Page.ts" />

module main {
    export var canvas: HTMLCanvasElement;
    export var ctx: CanvasRenderingContext2D;
    export class Book {
        private pages: Array<Page> = new Array<Page>();//array contendo as páginas
        private currentPage: number; // página atual

        constructor() {
            this.currentPage = 0;
        }

        //adiciona página ao livro
        addPage = (page: any) => {
            this.pages.push(page);
        }

        //retorna página atual
        getPageNumber = () => {
            return this.currentPage;
        }
        //retorna pagina atual
        public getPage = () => {
            return this.pages[this.currentPage];
        }
        
        //carrega a página
        public load = (): void => {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, 1280, 720);

            this.pages[this.currentPage].load();//carregamento das imagens da página

            requestAnimationFrame(this.load);
        }
        
        //
        public changePage = (numberPage: number): void => {
            var page: Page = this.pages[this.currentPage];
            var soundArray = page.getSons();
            //encerra todos os audios que tiver tocando
            soundArray.forEach(som => {
                som.EncerrarAudio();
            })

            this.currentPage = numberPage;
            this.load();
        }
    }

    export var book = new Book();// variavel do tipo livro
}