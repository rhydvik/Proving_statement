angular.module('common').directive('runsInyear', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
          runs:"=",
          year:"="
        },
        templateUrl: 'common/directive/runs-inyear/runs-inyear.html',
        link: function(scope, element, attrs, fn) {

      
        }
    };
});
