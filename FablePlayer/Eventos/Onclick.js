var Events;
(function (Events) {
    Events.onClick = function (data) {
        var test = new Events.EventTest();
        var media = Fables.book.requestMedia(data.item);
        var layer;
        var func = test.findFunction(data.action);
        $("#myCanvas").mousedown(function (event) {
            layer = test.testLayer(media);
        });
        $("#myCanvas").mouseup(function (event) {
            var x = event.pageX - Fables.canvas.offsetLeft;
            var y = event.pageY - Fables.canvas.offsetTop;
            var flag = test.testPosition(x, y, media.getBounds());
            if (flag && layer) {
                //Animation
                if (media instanceof Medias.Animation) {
                    switch (data.action) {
                        case "showMessage":
                            Events.showMessage(data.param1);
                            break;
                        case "moveRight":
                            Events.moveRight(media, data.param1, data.param2);
                            break;
                        case "moveLeft":
                            Events.moveLeft(media, data.param1, data.param2);
                            break;
                        case "moveUp":
                            Events.moveUp(media, data.param1, data.param2);
                            break;
                        case "moveDown":
                            Events.moveDown(media, data.param1, data.param2);
                            break;
                        case "start":
                            media.startInit(true);
                            break;
                        case "stop":
                            media.startInit(false);
                            break;
                        case "checkPositionX":
                            Events.CheckPositionX(media, data.param1, data.param2);
                            break;
                    }
                }
                if (media instanceof Medias.Figure) {
                    switch (data.action) {
                        case "checkItemPosX":
                            Events.checkItemPosX(data.param1, data.param2, data.param3, data.param4);
                            break;
                        case "checkVarValue":
                            Events.checkVarValue(data.param1, data.param2, data.param3, data.param4, data.param5);
                            break;
                        case "setValueVar":
                            Events.setValueVar(data.param1, data.param2);
                            break;
                        case "showLabel":
                            Events.showLabel(data.param1, data.param2, data.param3);
                            break;
                        case "changePage":
                            Fables.book.changePage(data.param1);
                            break;
                        case "showMessage":
                            Events.showMessage(data.param1);
                            break;
                        case "playAudio":
                            Events.playAudio(data.param1);
                        case "changeImg":
                            Events.changeImg(data.item, data.param1);
                    }
                }
            }
        });
    };
})(Events || (Events = {}));
//# sourceMappingURL=Onclick.js.map