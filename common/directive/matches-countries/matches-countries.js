angular.module('common').directive('matchesCountries', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
          labels:"=",
          data:"="
        },
        templateUrl: 'common/directive/matches-countries/matches-countries.html',
        link: function(scope, element, attrs, fn) {

        }
    };
});
