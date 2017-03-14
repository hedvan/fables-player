
    fablePlayer.directive('fable', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            //templateUrl: '../../src/templates/fable.html'
            template: '<div class="fable"></div>'
        };
    });