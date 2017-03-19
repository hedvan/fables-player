module Events {
    export var showMessage = function (msg: string):void {
        alert(msg);
    }

    export var moveRight = function (animation: Medias.Animation, value: number, velocity: number) {
        var interval;
        if (velocity == 0 || velocity == undefined) { velocity = 1; }

        function loop() {
            if (animation.getX() < value)
                animation.setX(animation.getX() + (1 * velocity));

            if (animation.getX() >= value) {
                clearInterval(interval);
                animation.setFrame(1);
            }
        }

        interval = setInterval(loop, 30, self);
    }

    export var moveLeft = function (animation: Medias.Animation, value: number, velocity: number) {
        var interval;
        if (velocity == 0 || velocity == undefined) { velocity = 1; }

        function loop() {
            animation.setX(animation.getX() - (1 * velocity));
            if (animation.getX() <= value) {
                clearInterval(interval);
            }
        }

        interval = setInterval(loop, 30, self);
    }

    export var moveUp = function (animation: Medias.Animation, value: number, velocity: number) {
        var interval;
        if (velocity == 0 || velocity == undefined) { velocity = 1; }

        function loop() {
            animation.setY(animation.getY() - (1 * velocity));
            if (animation.getY() <= value) {
                clearInterval(interval);
            }
        }

        interval = setInterval(loop, 30, self);
    }

    export var moveDown = function (animation: Medias.Animation, value: number, velocity: number) {
        var interval;
        if (velocity == 0 || velocity == undefined) { velocity = 1; }

        function loop() {
            animation.setY(animation.getY() + (1 * velocity));
            if (animation.getY() >= value) {
                clearInterval(interval);
            }
        }

        interval = setInterval(loop, 30, self);
    }

    export var CheckPositionX = function (animation: Medias.Animation, value: number, action: string) {
        var limit = animation.getX() + value;
        var interval;
        function loop() {
            if (animation.getX() === limit) {
                switch (action) {
                    case 'stop':
                        animation.startInit(false); break;
                }
                clearInterval(interval);
            }
        }

        interval = setInterval(loop, 30);
    }

    export var setValueVar = function (id: string, value: any): void {
        var item: Medias.Item = Fables.book.requestVar(id);
        item.setGettable(value);
    } 

    export var checkItemPosX = function (idItem: string, positionValue: number, action: string, param:any):void {
        var animation: Medias.Animation = Fables.book.requestMedia(idItem);
        if (animation.getX() === positionValue) {
            switch (action) {
                case 'showMessage':
                    showMessage(param); break;
                case 'changePage':
                    Fables.book.changePage(param); break;
            }
        }
    }

    export var checkVarValue = function (value: any, idItem: string, action: any, param1: any, param2: any) {
        var item: Medias.Item = Fables.book.requestVar(idItem);
        console.log(item);
        if (item.getGettable() == value) {
            alert("enttrei aqui")
            switch (action) {
                case 'showMessage':
                    showMessage(param1); break;
                case 'changePage':
                    Fables.book.changePage(param1); break;
            }
        } else {
            alert("entrei no no");
            switch (action) {
                case 'showMessage':
                    showMessage(param2); break;
            }
        }
    }

    export var showLabel = function (msg: string, x: number, y: number):void {
        var page = Fables.book.getPage();
        var label = page.addLabel(" ");
        label.setMessage(msg);
        label.setPosition(x, y);
        label.setLayer(4);
    }

    export var playAudio = function (SoundId: string): void {
        var sound: Medias.Sound = Fables.book.requestMedia(SoundId);
        sound.playAudio();
    }

    export var changeImg = function (imgId: string, newSrc: string): void {
        var img: Medias.Figure = Fables.book.requestMedia(imgId);
        img.setUrl(newSrc);
    }
}