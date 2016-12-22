/// <reference path="Book.ts" />

module main {

    export class action {
        private item: any;
        private guardaAlgo: boolean = false;
        private isClick: boolean;
                    
        public guardar = (item: any): void => {
            this.item = item;
            this.guardaAlgo = true;
            alert("item foi guardado");

        }

        public verificar = (): void => {
            if (this.item != null) {
                alert("este item tem algo guardado");
            } else {
                alert("este item nao tem nada guardado");
            }
        }

        public retirar = (): any => {
            if (this.guardaAlgo) {
                this.guardaAlgo = false;
                return this.item;
            }
        }

        
    }

    window.onload = () => {
        canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
        ctx = canvas.getContext("2d");

        story();
        book.load();
    };

    
}