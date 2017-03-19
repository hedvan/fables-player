module Medias {
    export class Sound extends Fables.Media {
        private static isPlaying: boolean = false;

        constructor(id: string, source: string) {
            super(id);
            this.media = new Audio(source);
        }

        public playAudio = (): void => {

            if (this.media.currentTime == 0 && !Sound.isPlaying) {
                Sound.isPlaying = true;
                this.media.play();
                console.log("toquei");
            }
        };

        public verifyAudio = (): void => {
            console.log("entre");
            if (this.media.ended) {
                Sound.isPlaying = false;
                this.media.currentTime = 0;
                console.log("parei");
            }
        }
        public playAudioBackground = (): void => {
            if (this.media.currentTime == 0 && !Sound.isPlaying) {
                Sound.isPlaying = true;
                this.media.play();
            }

            if (this.media.ended) {
                Sound.isPlaying = false;
                this.media.currentTime = 0;
                this.playAudioBackground();
            }
        };

        public closeAudio = (): void => {
            this.media.pause();
            this.media.currentTime = 0;
            Sound.isPlaying = false;
        }

        public getId = (): any => {
            return this.id;
        }
    }
}