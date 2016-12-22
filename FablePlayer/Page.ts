/// <reference path="Media.ts" />

module main {
    export class Page {
        private id: number //identificador da página
        private imagens: any = new Array();//imagens presente na página
        private sons: any = new Array();//audios presentes na página

        constructor(id) {
            this.id = id;
        }

        //carrega os elementos imagens da página na tela
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
}