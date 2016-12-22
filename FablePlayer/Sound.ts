/// <reference path="Media.ts" />
module main {
    // Tipo Som //
    export class Sound extends Media {

        constructor(id: string, source: string) {
            super(id);
            this.media = new Audio(source);
        }

        public ReproduzirAudio = (): void => { };
    }

    export class BackgroundAudio extends Sound {
        private isPlaying: boolean = false;

        constructor(id: string, source: string) {
            super(id, source);
        }

        public ReproduzirAudio = (): void => {
            if (this.media.currentTime == 0 && !this.isPlaying) {
                this.isPlaying = true;
                this.media.play();
            }

            if (this.media.ended) {
                this.isPlaying = false;
                this.media.currentTime = 0;
            }

            setInterval(this.ReproduzirAudio, 30, this.media, this.isPlaying);
        };
    }

    export class ClickAudio extends Sound {
        private ImageBind: string;
        private static isPlaying: boolean = false;

        constructor(id: string, source: string) {
            super(id, source);
        }

        public ReproduzirAudio = (): void => {
            if (this.media.currentTime == 0 && !ClickAudio.isPlaying) {
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

        public getId = (): any => {
            return this.id;
        }

        public setImageBind = (value: any): void => {
            this.ImageBind = value;
        }
    }
}