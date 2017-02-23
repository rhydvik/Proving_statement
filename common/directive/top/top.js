//
// angular.module("app", ["chart.js"]).controller("BarCtrl", function ($scope) {
//   $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
//   $scope.series = ['Series A', 'Series B'];
//
//   $scope.data = [
//     [65, 59, 80, 81, 56, 55, 40],
//     [28, 48, 40, 19, 86, 27, 90]
//   ];
// })

angular.module('common').directive('top', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            dummyVar:"=",
            data:"=",
            abcD:"=",
            cdata:"=",
            labels:"=",
            series:"=",
            data:"="
        },
        templateUrl: 'common/directive/top/top.html',
        link: function(scope, element, attrs, fn) {

          //alert("asdad");
          // scope.$watch("dummyVar", function (newVal) {
          //   console.log("asda",newVal);
          // });

        }
    };
});
