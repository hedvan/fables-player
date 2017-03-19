module Events {
    export class EventTest {
        constructor() {

        }

        public findAnimation = (id: string): Medias.Animation => {
            var animation = Fables.book.requestMedia(id);
            return animation;
        }

        public testLayer = (media: any): boolean => {
            var result = (media.getpageBelongs() === Fables.book.getPageNumber());
            return result;
        }

        public testPosition = (x: number, y: number, property: Medias.Bounds): boolean => {
            var flag = (property.x < x) && (x < (property.x + property.width)) &&
                (property.y < y) && (y < (property.y + property.height));

            return flag;
        }

        public findFunction = (name: string): any => {
            if (name === "ShowMessage") {
                return showMessage;
            }
        }
    }
}
