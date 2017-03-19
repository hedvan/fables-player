module Medias {
    export class Label extends Fables.Media {
        private message: string;
        private X: number;
        private Y: number;
        private color: string;
        private font: string;
        private layer: number;

        constructor(id: string) {
            super(id);
            this.font = "30px Arial";
            this.color = "black";
        }

        public render = (): void => {
            var cont = 0;
            var lines = this.media.split("\n");

            ctx.fillStyle = this.color;
            ctx.font = this.font;
            var fontsize = parseInt(ctx.font.substring(0, 2)) - 2;

            for (var i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], this.X, this.Y + (fontsize * i));
            }
        }

        public setColor = (value): void => {
            this.color = value;
        }

        public setFont = (value): void => {
            this.font = value;
        }

        public setPosition = (x: number, y: number): void => {
            this.X = x;
            this.Y = y;
        }

        public setMessage = (msg: string): void => {
            this.media = msg;
        }

        public setLayer = (value: number): void => {
            this.layer = value;
        }

        public getLayer = (): number => {
            return this.layer;
        }
    }
}