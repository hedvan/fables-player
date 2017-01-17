// reference path=".\Scripts\typings\jquery\jquery.d.ts"/>

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;

class Book {
    private pages: Array<Page> = new Array<Page>();//array contendo as páginas
    private currentPage: number; // página atual
    private pageAnimate;
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

        this.pageAnimate = requestAnimationFrame(this.load);
    }
        
    //
    public changePage = (numberPage: number): void => {
        var page: Page = this.pages[this.currentPage];
        var Itens = page.getItens();
        //encerra todos os audios que tiver tocando
        Itens.forEach(elem => {
            if (elem instanceof Sound) {
                elem.EncerrarAudio();
            }
        })
        cancelAnimationFrame(this.pageAnimate);
        this.currentPage = numberPage;
        this.load();
    }
}

var book = new Book();// variavel do tipo livro
//
//PAGE CLASS
//
class Page {
    private id: number //identificador da página
    private itens: any = new Array();//imagens presente na página
    

    constructor(id) {
        this.id = id;
    }

    //carrega os elementos imagens da página na tela
    public load = (): void => {
        this.itens.forEach(element => {
            if (element instanceof Label || element instanceof Animation
                || element instanceof Imagem)
                element.render();
        })
    }

    //seta a camada da imagem e adiciona ao vetor
    public addElement = (item: any): void => {
        var flag = true;
        this.itens.forEach(element => {
            if (element.getId() === item.getId()) {
                flag = false;
            }
        })
        if (flag) {
            if (item instanceof Imagem || item instanceof Animation) {
                item.setLayer(this.id);
            }
            this.itens.push(item);
        }
    }
    
    public getSom = (spec: string): any => {
        var elem = this.itens;
  
        for (var i = 0; i < elem.length; i++) {
            console.log(elem[i].getId() === spec);
            if (elem[i].getId() === spec) {
                return elem[i];
            }
        }
    }
    
    public getItens = (): any => {
        return this.itens;
    }

}
//
//MEDIA CLASS
//
abstract class Media {
    protected id: string;
    protected media: any;

    constructor(id: string) {
        this.id = id;
    }

    public getId = (): string => {
        return this.id;
    }
}
//
//Imagem CLASS
//
class Imagem extends Media {
    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;
    private layer: number;
    public events: Events;
    

    constructor(id: string, source: any, x: number, y: number, width: number, height: number) {
        super(id);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.media = new Image();
        this.media.src = source;
        this.events = new Events(x, y, width, height);

    }

    //desenha a imagem
    render = (): void => {
        ctx.save();
        ctx.drawImage(this.media, this.x, this.y, this.width, this.height);
        ctx.restore();
    }

    public setLayer = (value: any): void => {
        this.events.setLayer(value);
    }

    public setSrc = (value: any): void=> {
        this.media.src = value;
    }
}

//
//SOUND CLASS
//
class Sound extends Media {
    private static isPlaying: boolean = false;

    constructor(id: string, source: string) {
        super(id);
        this.media = new Audio(source);
    }
    
    public ReproduzirAudio = (): void => {
        if (this.media.currentTime == 0 && !Sound.isPlaying) {
            Sound.isPlaying = true;
            this.media.play();
        }

        if (this.media.ended) {
            Sound.isPlaying = false;
            this.media.currentTime = 0;
        }
    };

    public EncerrarAudio = (): void => {
        this.media.pause();
        this.media.currentTime = 0;
        Sound.isPlaying = false;
    }

    public getId = (): any => {
        return this.id;
    }
}


    //
    //LABEL CLASS
    //

    class Label extends Media{
        private message: string;
        private x: number;
        private y: number;
        private color: string;
        private font: string;

        constructor(id:string,msg: string, x: number, y: number) {
            super(id);
            this.message = msg;
            this.x = x;
            this.y = y;
            this.font = "30px Arial";
            this.color = "black";
        }

        public render = (): void => {
            var cont = 0;
            var lines = this.message.split("\n ");

            ctx.fillStyle = this.color;
            ctx.font = this.font;
            var fontsize = parseInt(ctx.font.substring(0, 2))-2;
            
            for (var i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], this.x, this.y+(fontsize*i));
            }
        }

        public setColor(value): void {
            this.color = value;
        }

        public setFont(value): void {
            this.font = value;
        }
    }
    //
    //  ANIMATION CLASS
    //
    class Animation extends Media {
        private x;
        private y;
        private width;
        private height;
        private frameIndex = 0;
        private tickCount = 0;
        private ticksPerFrame = 30;
        private numberOfFrames;
        private layer;
        public events: Events;
        constructor(id:string, frames: number,x,y,w,h, src: string) {
            super(id);
            this.media = new Image();
            this.media.src = src;
            this.numberOfFrames = frames;
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
            this.events = new Events(x, y, w, h);
        }


        public render = (): void => {
            console.log(this.ticksPerFrame);
            ctx.drawImage(this.media,
                this.frameIndex*this.width,0,
                this.width,this.height,
                this.x,this.y,
                this.width, this.height);
                
            this.Update();
        }

        private Update = (): void => {
            this.tickCount += 1;
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                if (this.frameIndex < this.numberOfFrames - 1) {
                    this.frameIndex += 1;
                } else {
                    this.frameIndex = 0;
                }
            }
        }

        public setVelocidade = (value: number): void => {
            this.ticksPerFrame = value;
        }
        
        public setLayer = (value: any): void => {
            this.events.setLayer(value);
        }
    }
    //
    //Events class
    //
    class Events{
        private x;
        private y;
        private w;
        private h;
        private layer;
        private action;
        constructor(_x , _y ,_w , _h) {
            this.x = _x;
            this.y = _y;
            this.h = _h;
            this.w = _w;
            this.action = new Actions();
        }

        public setLayer = (value): void => {
            this.layer = value;
        }
        //teste se as imagem exibidas pertecem a pagina atual
        private testLayer = (): boolean => {
            var result =( this.layer === book.getPageNumber());
            return result;
        }
        
        public aoClicar = (func,value1?:any,value2?:any,value3?:any,value4?:any,value5?:any): Actions=> {
            var self = this;
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
                } else {
                    console.log("teste");
                    console.log((self.x < x) && (x < (self.x + self.w)))
                    console.log((self.y < y) && (y < (self.y + self.h)))
                }
            });

            return this.action;
        }
        
    }

    

    class Item {
        private gettable: any;

        constructor(inicial: any) {
            this.gettable = inicial;
        }

        public setGettable = (value): void => {
            this.gettable = value;
        }

        public getGettable = (): boolean => {
            return this.gettable
        }

        public incrementGettable = (): void => {
            ++this.gettable;
        }

        public decrementGettable = (): void => {
            --this.gettable;
        }
    }
    
    
    class Actions {
        public exibirMsg = (msg:string): void => {
            alert(msg);
        }

        public checaValorExibeMsg = (i: Item, value: any, msg: string, msg2?: string): void => {
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

        public checaValorExibeLabel = (i: Item, value: any,page:Page,label1: string, label2: string): void => {
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
            } else {
                page.addElement(label2);
            }
        }

        public mudarValor = (obj: Item, value: any): void => {
            obj.setGettable(value);
        }

        public tocarAudio = (id: any): void => {
            
            var som = book.getPage().getSom(id);
            som.ReproduzirAudio();
        }

        public irParaPagina = (numberPage: number): void => {
            
            book.changePage(numberPage);
        }

        public verdadeiroMudarImg = (i: Imagem, value: string, k: Item): void => {
            if (k.getGettable()){
                i.setSrc(value);
            }
        }

        public checaValorMudadePagina = (i: Item, value: any, numberPage: number): void => {
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

        public incrementar = (i: Item): void => {
            //incrementa
            i.incrementGettable();
        }

        public decrementar = (i: Item): void => {
            //incrementa
            i.decrementGettable();
        }

        public exibirLabel = (page: Page, i: Label): void => {
            page.addElement(i);        
        }
    }
    var actions = new Actions();

    window.onload = () => {
        canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
        ctx = canvas.getContext("2d");
        story();
        book.load();
    };
    

    function story() {
        //page1 - capa
        var page = new Page(0);
       
        var background = new Imagem("bg", "Media/BG.png", 0, 0, 1280, 720);
        page.addElement(background);

        var som1 = new Sound("som", "Media/audio1.mp3");
        page.addElement(som1);
        var titulo = new Label("titulo","O primeiro cavaleiro", 100, 200);
        titulo.setColor("black");
        titulo.setFont("120px Arial");
        page.addElement(titulo);

        var texto1 = new Label("texto1","Encontre a chave \n nos arburtos \n para abrir a porta", 450, 400);
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

        var key = new Item(false);//para que a chave se torne um boolean

        var knight = new Animation("knight", 10, 540, 490, 100, 120, "Media/idle.png");

        knight.setVelocidade(4);
        knight.events.aoClicar(actions.exibirMsg, "olá eu sou o primeiro cavleiro");
        knight.events.aoClicar(actions.tocarAudio,"som");
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
        bulkhead1.events.aoClicar(actions.checaValorExibeMsg, count, 3, "A porta foi aberta","continue a apertar");
        page2.addElement(bulkhead1);
    
        //porta fechada
        var door1 = new Imagem("door1", "Media/DoorLocked.png", 1000, 470, 70, 131);
        //texto de ajuda
        var text2 = new Label("text2","Aperte o botão até abrir a porta", 200, 100);
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
        box1.events.aoClicar(actions.exibirMsg,"não há nada nessa caixa");
        page3.addElement(box1);

        var box2 = new Imagem("box2", "Media/box.png", 600, 200, 77, 77);
        box2.events.aoClicar(actions.exibirMsg,"não há nada nessa caixa");
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
    
