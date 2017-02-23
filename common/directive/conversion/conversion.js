angular.module('common').directive('conversion', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
          pielabels:"="
        },
        templateUrl: 'common/directive/conversion/conversion.html',
        link: function(scope, element, attrs, fn) {
          scope.data = ["Fifties","Hundreads"]
        }
    };
});
