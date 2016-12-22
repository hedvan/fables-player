/// <reference path="app.ts" />
var main;
(function (main) {
    document.onmousemove = function (event) {
        main.cursorX = event.x;
        main.cursorY = event.y;
        main.cursorX -= main.canvas.offsetLeft;
        main.cursorY -= main.canvas.offsetTop;
    };
})(main || (main = {}));
//# sourceMappingURL=ElementImage.js.map