angular.module('common', ['ui.bootstrap','ui.router','ngAnimate','chart.js']);

angular.module('common').config(function($stateProvider) {

    /* Add New States Above */
    $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'common/partial/main/main.html'
        });
        
});
