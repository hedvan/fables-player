/**
 * Created by TeleMidiaUFMA on 14/03/17.
 */

var fablePlayer = angular.module('fablePlayer', []);

fablePlayer.controller('fablePlayerController', ['$scope', function($scope) {
    $scope.fable = {};
}]);

fablePlayer.directive('fable', ['$document', function($document) {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {
            createFable(scope, element, attr);
        }
    };
}]);

fablePlayer.directive('left', ['$document', function($document) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.css({
                position: 'absolute',
                left: attr.left + 'px'
            });
        }
    };
}]);
fablePlayer.directive('right', ['$document', function($document) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.css({
                position: 'absolute',
                right: attr.right + 'px'
            });
        }
    };
}]);
fablePlayer.directive('top', ['$document', function($document) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.css({
                position: 'absolute',
                top: attr.top + 'px'
            });
        }
    };
}]);
fablePlayer.directive('bottom', ['$document', function($document) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.css({
                position: 'absolute',
                bottom: attr.bottom + 'px'
            });
        }
    };
}]);

fablePlayer.directive('width', ['$document', function($document) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.css({
                position: 'absolute',
                width: attr.width + 'px'
            });
        }
    };
}]);

fablePlayer.directive('height', ['$document', function($document) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.css({
                position: 'absolute',
                height: attr.height + 'px'
            });
        }
    };
}]);

fablePlayer.directive('draggable', ['$document', function($document) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                // hum tem que ver isso aqui
                var startX = 0, startY = 0, x = 0, y = 0;

                element.css({
                    position: 'relative',
                    border: '1px solid red',
                    backgroundColor: 'lightgrey',
                    cursor: 'pointer'
                });

                element.on('mousedown', function(event) {
                    // Prevent default dragging of selected content
                    event.preventDefault();
                    startX = event.pageX - x;
                    startY = event.pageY - y;
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                });

                function mousemove(event) {
                    y = event.pageY - startY;
                    x = event.pageX - startX;
                    element.css({
                        top: y + 'px',
                        left:  x + 'px'
                    });
                }

                function mouseup() {
                    $document.off('mousemove', mousemove);
                    $document.off('mouseup', mouseup);
                }
            }
        };
    }]);

function createFable(scope, element, attr){
    if (scope){
        if (scope.fable === undefined){
            scope.fable = {};
        }

        if (attr && attr.id){
            scope.fable.id = attr.id;
        }
    }


    console.log(element.parent());


    element.css({
        border: '1px solid black',
        backgroundColor: 'lightgrey',
        display: 'block',
        position: 'relative'
    });
}

function createPage(scope, page, index){

}



