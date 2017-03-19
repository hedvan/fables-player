module Medias{
    export class Item {
        private id: string;
        private value: any;

        constructor(id: string, inicial:any) {
            this.id = id;
            this.value = inicial;
        }

        public setGettable = (value): void => {
            this.value = value;
        }

        public getGettable = (): any => {
            return this.value;
        }
        public getId = (): string => {
            return this.id;
        }
    }
}