var Events;
(function (Events) {
    Events.showMessage = function (msg) {
        alert(msg);
    };
    Events.moveRight = function (animation, value, velocity) {
        var interval;
        if (velocity == 0 || velocity == undefined) {
            velocity = 1;
        }
        function loop() {
            if (animation.getX() < value)
                animation.setX(animation.getX() + (1 * velocity));
            if (animation.getX() >= value) {
                clearInterval(interval);
                animation.setFrame(1);
            }
        }
        interval = setInterval(loop, 30, self);
    };
    Events.moveLeft = function (animation, value, velocity) {
        var interval;
        if (velocity == 0 || velocity == undefined) {
            velocity = 1;
        }
        function loop() {
            animation.setX(animation.getX() - (1 * velocity));
            if (animation.getX() <= value) {
                clearInterval(interval);
            }
        }
        interval = setInterval(loop, 30, self);
    };
    Events.moveUp = function (animation, value, velocity) {
        var interval;
        if (velocity == 0 || velocity == undefined) {
            velocity = 1;
        }
        function loop() {
            animation.setY(animation.getY() - (1 * velocity));
            if (animation.getY() <= value) {
                clearInterval(interval);
            }
        }
        interval = setInterval(loop, 30, self);
    };
    Events.moveDown = function (animation, value, velocity) {
        var interval;
        if (velocity == 0 || velocity == undefined) {
            velocity = 1;
        }
        function loop() {
            animation.setY(animation.getY() + (1 * velocity));
            if (animation.getY() >= value) {
                clearInterval(interval);
            }
        }
        interval = setInterval(loop, 30, self);
    };
    Events.CheckPositionX = function (animation, value, action) {
        var limit = animation.getX() + value;
        var interval;
        function loop() {
            if (animation.getX() === limit) {
                switch (action) {
                    case 'stop':
                        animation.startInit(false);
                        break;
                }
                clearInterval(interval);
            }
        }
        interval = setInterval(loop, 30);
    };
    Events.setValueVar = function (id, value) {
        var item = Fables.book.requestVar(id);
        item.setGettable(value);
    };
    Events.checkItemPosX = function (idItem, positionValue, action, param) {
        var animation = Fables.book.requestMedia(idItem);
        if (animation.getX() === positionValue) {
            switch (action) {
                case 'showMessage':
                    Events.showMessage(param);
                    break;
                case 'changePage':
                    Fables.book.changePage(param);
                    break;
            }
        }
    };
    Events.checkVarValue = function (value, idItem, action, param1, param2) {
        var item = Fables.book.requestVar(idItem);
        console.log(item);
        if (item.getGettable() == value) {
            alert("enttrei aqui");
            switch (action) {
                case 'showMessage':
                    Events.showMessage(param1);
                    break;
                case 'changePage':
                    Fables.book.changePage(param1);
                    break;
            }
        }
        else {
            alert("entrei no no");
            switch (action) {
                case 'showMessage':
                    Events.showMessage(param2);
                    break;
            }
        }
    };
    Events.showLabel = function (msg, x, y) {
        var page = Fables.book.getPage();
        var label = page.addLabel(" ");
        label.setMessage(msg);
        label.setPosition(x, y);
        label.setLayer(4);
    };
    Events.playAudio = function (SoundId) {
        var sound = Fables.book.requestMedia(SoundId);
        sound.playAudio();
    };
    Events.changeImg = function (imgId, newSrc) {
        var img = Fables.book.requestMedia(imgId);
        img.setUrl(newSrc);
    };
})(Events || (Events = {}));
//# sourceMappingURL=Actions.js.map