angular.module('common').controller('MainCtrl',function($scope, utilities,$http){
    $scope.dummyVar = 'hello';
    $scope.newcsvData=[];


    $http.get('common/partial/main/sachin.json').then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
        console.log("data recieved");
        $scope.fetchedData= response.data;
        $scope.getData =getData($scope.fetchedData);
    }, function errorCallback(response) {
        console.log('error');
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });


    $http.get('common/partial/main/sachin.csv').then(function successCallback(response) {
        console.log("data recieved");
        $scope.csvData= response.data;
        $scope.newcsvData =csvToJSON($scope.csvData);
    }, function errorCallback(response) {
        console.log('error');
    });






    // function getData(data){
    //   //alert("asdasd");
    //   var sum =0;
    //   for(var i=0; i<data.length; i++){
    //     if(data[i].catches=='-'){
    //       console.log(i);
    //       data[i].catches =0;
    //       console.log("changed",data[i].catches);
    //     }
    //
    //     sum += data[i].catches;
    //
    //   }
    //   console.log('total catches',sum);
    // }


    function csvToJSON(csv, callback) {
        var lines = csv.split("\n");
        console.log("lines",lines.length);
        var result = [];
        var headers = lines[0].split(",");
        console.log("headers",headers);

        for (var i = 1; i < lines.length - 1; i++) {
            var obj = {};
            var currentline = lines[i].split(",");
            //console.log("currentline",currentline);
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
            console.log(result);
        }
        if (callback && (typeof callback === 'function')) {
            return callback(result);
        }
        console.log("getcsvtoo",result);
        return result;
    }


    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];







    // $http({
    //   url: 'http://localhost:3000/', // No need of IP address
    //   method: 'GET',
    //   data: $scope.dummyVar,
    //   headers: {'Content-Type': 'application/json'}
    // }).success(function (result){
    //   $scope.res=result;
    //   console.log("line",$scope);
    // }).error(function(error,status){
    //   console.log("error");
    // })
  });
