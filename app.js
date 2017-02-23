angular.module('app', ['ui.bootstrap', 'ui.router', 'ngAnimate', 'common',]);

angular.module('app').config(function($stateProvider, $urlRouterProvider) {

    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

});

angular.module('app').run(function($rootScope,$http) {
  console.log('this is run');
  $rootScope.data='';
    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
});
