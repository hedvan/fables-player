module main {
    //Variaveis globais
    var canvas: HTMLCanvasElement;
    var ctx: CanvasRenderingContext2D;
    //
    class Book {
        public pages: Array<Page> = new Array<Page>();//array contendo as páginas
        private currentPage: number; // página atual

        constructor() {
            this.currentPage = 0;
        }

        //adiciona página ao livro
        addPage = (page: any) => {
            this.pages.push(page);
        }

        //retorna página atual
        getPage = () => {
            return this.currentPage;
        }

        //seta a página atual
        setPage = (value: number) => {
                this.currentPage = value;
        }
        //carrega a página
        public load = (): void => {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, 1280, 720);

            this.pages[this.currentPage].load();//carregamento das imagens da página

            requestAnimationFrame(this.load);
        }
        //
        public getCurrentPage = (): Page => {
            return this.pages[this.currentPage];
        }
    }

    var book = new Book();// variavel do tipo livro
    //

    //
    class Page {
        private id: number //identificador da página
        private imagens: any = new Array();//imagens presente na página
        private sons: any = new Array();//audios presentes na página

        constructor(id) {
            this.id = id;
        }

        //carrega os elementos da página na tela
        public load = (): void => {
            this.imagens.forEach(element => {
                element.render();
            })
        }

        //seta a camada da imagem e adiciona ao vetor
        public imagemPush = (item: any): void => {
            if (item instanceof ClickableImagem) {
                item.setLayer(this.id);
            }
            this.imagens.push(item);
        }
        
        public sonsPush = (item: any): void => {
            this.sons.push(item);
        }

        public getSons = (): any => {
            return this.sons;
        }

    }
    //

    //
    abstract class Media{
        protected id: String;
        protected media: any;

        constructor(id:string) {
            this.id = id;
        }
    }

    // Tipo Imagem //
    class Imagem extends Media {
        protected x: number;
        protected y: number;
        protected width: number;
        protected height: number;

        constructor(id: string, source: any, x: number, y: number, width: number, height: number){
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

    class ClickableImagem extends Imagem {
        private action: string;
        private activate: boolean;
        private layer: number;
        private isClick: boolean;
        private value: any;

        constructor(id: string, source: any, x: number, y: number, width: number, height: number) {
            super(id, source, x, y, width, height);

            canvas.addEventListener("mousedown", this.mouseDown, false);
            canvas.addEventListener("mouseup", this.mouseUp, false);
        }

        public setAction = (action: string, value?:any): void => {
            this.action = action;
            this.value = value;
        }

        protected mouseDown = (event: MouseEvent): void => {
            if (this.layer === book.getPage())
                this.activate = true;                  
        }

        protected mouseUp = (event: MouseEvent): void => {
            var x: number = event.x - canvas.offsetLeft;
            var y: number = event.y - canvas.offsetTop;


            if ((this.x < x) && (x < (this.x + this.width)) &&
                (this.y < y) && (y < (this.y + this.height))) {

                if (this.activate === true) {
                    this.activate = false;
                    if (this.action == "ir para")
                        this.change(book, this.value);    
                    if (this.action == "tocar") {
                        this.playOnclick();
                    }
                }
            }
        }

        public setLayer = (value: any): void => {
            this.layer = value;
        }

        private change = (book: Book, numberPage: number): void => {
            //retorne a page
            var page = book.getCurrentPage();
            var soundArray = page.getSons();

            soundArray.forEach(som => {
                som.EncerrarAudio();
            })
            //
            book.setPage(numberPage);
            book.load();
        }

        private playOnclick = (): void => {
            //se a pessoa mandar um array de audios
            if (this.value instanceof Array) {
                this.value.forEach(som => {
                    if (som.getImageBind() === this.id) {
                        som.ReproduzirAudio();
                    }
                })
            } else {
                this.value.ReproduzirAudio();
            }
            
        }
    }
    // Tipo Som //
    abstract class Sound extends Media {

        constructor(id: string, source: string) {
            super(id);
            this.media = new Audio(source);
        }

        public ReproduzirAudio = ():void => { };
    }

    class BackgroundAudio extends Sound {
        private isPlaying: boolean = false;    

        constructor(id: string, source: string) {
            super(id,source);
        }

        public ReproduzirAudio = (): void => {
            if (this.media.currentTime == 0 && !this.isPlaying) {
                this.media.currentTime = 85;
                this.isPlaying = true;
                this.media.play();
            }

            if (this.media.ended) {
                this.isPlaying = false;
                this.media.currentTime = 0;
            }

            setInterval(this.ReproduzirAudio,30, this.media, this.isPlaying);
        };
    }
    
    class ClickAudio extends Sound {
        private ImageBind: string;
        private static isPlaying: boolean = false;

        constructor(id: string, source: string) {
            super(id, source);
        }
        
        public ReproduzirAudio = (): void => {
            if (this.media.currentTime == 0 && !ClickAudio.isPlaying) {
                this.media.currentTime = 85;
                ClickAudio.isPlaying = true;
                this.media.play();
            }

            if (this.media.ended) {
                ClickAudio.isPlaying = false;
                this.media.currentTime = 0;
            }
        };

        public EncerrarAudio = (): void => {
            this.media.pause();
            this.media.currentTime = 0;
            ClickAudio.isPlaying = false;
        }

        public getImageBind = (): any => {
            return this.ImageBind;
        }

        public setImageBind = (value: any): void => {
            this.ImageBind = value;
        }
    }

    var scene = new Array();

    window.onload = () => {
        canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
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

        var teste = new ClickableImagem("dory", "https://pbs.twimg.com/profile_images/773917612648591365/hFl6DSSh.jpg",
            100, 100, 226, 300);

        teste.setAction("ir para", 1);
        page1.imagemPush(teste);

        var teste1 = new ClickableImagem("dory", "https://pbs.twimg.com/profile_images/773917612648591365/hFl6DSSh.jpg",
            700, 100, 226, 300);
        teste1.setAction("tocar", page1.getSons());
        page1.imagemPush(teste1);

        var crane = new ClickAudio("crane", "media/cranes.mp3");
        crane.setImageBind("eleanor");

        page1.sonsPush(crane);

        var noite = new ClickableImagem("eleanor", "https://pbs.twimg.com/profile_images/773917612648591365/hFl6DSSh.jpg",
            400, 400, 226, 300);
        noite.setAction("tocar", page1.getSons());
        page1.imagemPush(noite);

        return page1;
    }

    scene[1] = function () {
        var page2 = new Page(1);

        var teste2 = new ClickableImagem("dory", "https://pbs.twimg.com/profile_images/773917612648591365/hFl6DSSh.jpg",
            120, 120, 226, 300);
        teste2.setAction("ir para", 2);

        page2.imagemPush(teste2);

        var teste22 = new ClickableImagem("dory", "https://pbs.twimg.com/profile_images/773917612648591365/hFl6DSSh.jpg",
            500, 200, 226, 300);
        teste22.setAction("ir para", 0);

        page2.imagemPush(teste22);

        return page2;
    }

    scene[2] = function () {
        var page3 = new Page(2);

        var teste3 = new ClickableImagem("dory", "https://pbs.twimg.com/profile_images/773917612648591365/hFl6DSSh.jpg",
            200, 120, 226, 300);
        teste3.setAction("ir para", 0);
        page3.imagemPush(teste3);

        return page3;
    }    
}