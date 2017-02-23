angular.module('common').directive('carrierDetails', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
          cdata:"="
        },
        templateUrl: 'common/directive/carrier-details/carrier-details.html',
        link: function(scope, element, attrs, fn) {


        }
    };
});
