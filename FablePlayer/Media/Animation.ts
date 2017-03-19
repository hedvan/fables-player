module Medias {
    export class Animation extends Fables.Media {
        private property: Array<Bounds>;
        private frameIndex = 0;
        private tickCount = 0;
        private ticksPerFrame = 30;
        private numberOfFrames;
        private layer: number;
        private start: boolean;
        private looping: boolean;
        public pageBelongs;
        

        constructor(id: string, src: string) {
            super(id);
            this.media = new Image();
            this.media.src = src;
            this.property = new Array<Bounds>();
            this.start = false;
        }

        public setBounds = (value: IBounds): void => {
            var element = this.property[this.pageBelongs] = new Bounds();
            element.x = value.x;
            element.y = value.y;
            element.width = value.width;
            element.height = value.height;
        }

        public setFrame = (frames: number): void => {
            this.numberOfFrames = frames;
        }

        public render = (): void => {
            var elem = this.property[this.pageBelongs];
            console.log("x:"+elem.x);
            ctx.drawImage(this.media,
                this.frameIndex * elem.width, 0,
                elem.width, elem.height,
                elem.x, elem.y,
                elem.width, elem.height);
            if (this.start) {
                this.Update();
            }
           
        }

        private Update = (): void => {
            this.tickCount += 1;
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                if (this.frameIndex < this.numberOfFrames - 1) {
                    this.frameIndex += 1;
                } else {
                    if (this.looping)
                        this.frameIndex = 0;
                }
            }
        }

        public setVelocity = (value: number): void => {
            this.ticksPerFrame = value;
        }

        public setpageBelongs = (value: any): void => {
            this.pageBelongs = value;
        }

        public startInit = (value: boolean): void => {
            this.start = value;
        }

        public loop = (value: boolean): void => {
            this.looping = value;    
        }

        public getpageBelongs = (): number => {
            return this.pageBelongs;
        }

        public setLayer = (value: any): void => {
            this.layer = value;
        }

        public getLayer = (): number => {
            return this.layer;
        }

        public getX = (): number => {
            var elem = this.property[this.pageBelongs];
            return elem.x;
        }

        public getY = (): number => {
            var elem = this.property[this.pageBelongs];
            return elem.y;
        }

        public setUrl = (value: string): void => {
            this.media.src = value;
        }

        public getUrl = (): string => {
            return this.media.src;
        }

        public setX(value: number): void {
            this.property[this.pageBelongs].x = value;
        }

        public setY(value: number): void {
            this.property[this.pageBelongs].y = value;
        }

        public getBounds(): Bounds {
            return this.property[this.pageBelongs];
        }

    }
}