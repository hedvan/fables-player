module Events{
    interface Itest {
        item: string;
        action: string;
        param1?: any;
        param2?: any;
        param3?: any;
        param4?: any;
        param5?: any;
    }

    export var onClick = function (data: Itest) {
        var test = new EventTest();
        var media = Fables.book.requestMedia(data.item);
        var layer: boolean;
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
                            showMessage(data.param1); break;
                        case "moveRight":
                            moveRight(media, data.param1, data.param2); break;
                        case "moveLeft":
                            moveLeft(media, data.param1, data.param2); break;
                        case "moveUp":
                            moveUp(media, data.param1, data.param2); break;
                        case "moveDown":
                            moveDown(media, data.param1, data.param2); break;
                        case "start":
                            media.startInit(true); break;
                        case "stop":
                            media.startInit(false); break;
                        case "checkPositionX":
                            CheckPositionX(media, data.param1, data.param2); break;
                    }
                }
                if (media instanceof Medias.Figure) {
                    switch (data.action) {
                        case "checkItemPosX":
                            checkItemPosX(data.param1, data.param2, data.param3, data.param4);
                            break;
                        case "checkVarValue":
                            checkVarValue(data.param1, data.param2, data.param3, data.param4, data.param5); break;
                        case "setValueVar":
                            setValueVar(data.param1, data.param2); break;
                        case "showLabel":
                            showLabel(data.param1, data.param2, data.param3); break;
                        case "changePage":
                            Fables.book.changePage(data.param1); break;
                        case "showMessage":
                            showMessage(data.param1); break;
                        case "playAudio":
                            playAudio(data.param1);
                        case "changeImg":
                            changeImg(data.item,data.param1);
                    }
                }
            }
        });
    } 
}