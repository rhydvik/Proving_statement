angular.module('common').directive('lineGraph', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
          linedata:"=",
          years:"="
        },
        templateUrl: 'common/directive/line-graph/line-graph.html',
        link: function(scope, element, attrs, fn) {


        }
    };
});
