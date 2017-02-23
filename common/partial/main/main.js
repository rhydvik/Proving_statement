// This is main controller where all data processing will happen.
// Read the csv file and Convert it into json object.
// collect all the possible data to show on page.


angular.module('common').controller('MainCtrl',function($scope,$http){
    $http.get('common/partial/main/sachin.csv').then(function successCallback(response){
        //console.log("data recieved");
        $scope.csvData = response.data;


        //Convert csv data to json
        $scope.jsonData = convertCsvData($scope.csvData);
        $scope.callfunction = getPossibleData($scope.jsonData);

    },function errorCallback(response){

    });

    //converting csv data
    function convertCsvData(data) {
        var convertedData = [];
        var totalNoOfLines = data.split("\n");
        var columnHeaders = totalNoOfLines[0].split(",");
         for(var i = 1; i < totalNoOfLines.length-1; i++){
           var obj = {};
           var currentlineData = totalNoOfLines[i].split(",");
            for(var j = 0; j < columnHeaders.length; j++){
              obj[columnHeaders[j]] = currentlineData[j];
            }
            convertedData.push(obj);
          }
          return convertedData;
        }

    //get all possible combination of data
    function getPossibleData(data){
      console.log(data);
      var totalRuns = 0;
      var totalNotOuts = 0;
      var didNotBat = 0;
      var totalInnings = 0;
      var totalMatches = data.length;
      var totalCenturies = [];
      var totalHalfCenturies = [];
      var Innings = [];
      var battingAverage = 0;
      var bowlingAverage = 0;
      var carrierData =0;
      angular.forEach(data,function(element){
        var scoredFifties = {};
        var scoredHundred = {};
        var totalInningsPlayed = {};
        if(element.batting_score.indexOf("*")> -1){
          totalNotOuts++;
          element.batting_score= element.batting_score.replace("*",'');
        }
        if(isNaN(element.batting_score)){
          element.batting_score = '0';
          didNotBat++;
        }



        if(element.batting_score >=50 && element.batting_score<100 ){
          scoredFifties.runs = parseInt(element.batting_score);
          scoredFifties.result = element.match_result;
          scoredFifties.against = element.opposition;
          scoredFifties.date=new Date(element.date).getFullYear();
          scoredFifties.innings = element.batting_innings;
          totalHalfCenturies.push(scoredFifties);
        }else if(element.batting_score >=100){
          scoredHundred.runs = parseInt(element.batting_score);
          scoredHundred.result = element.match_result;
          scoredHundred.against = element.opposition;
          scoredHundred.date=new Date(element.date).getFullYear();
          scoredHundred.innings = element.batting_innings;
          totalCenturies.push(scoredHundred);
        }

        totalInningsPlayed.runs = parseInt(element.batting_score);
        totalInningsPlayed.result = element.match_result;
        totalInningsPlayed.against = element.opposition;
        totalInningsPlayed.date=new Date(element.date).getFullYear();
        totalInningsPlayed.innings = element.batting_innings;
        Innings.push(totalInningsPlayed);


        totalRuns +=parseInt(element.batting_score);
      });

      var totalCatches = sumData(data,'catches');
      var runsConceded = sumData(data,'runs_conceded');
      var wicketsTaken = sumData(data,'wickets');
      var stumps = sumData(data,'stumps');

      totalInnings = totalMatches-didNotBat;
      battingAverage = totalRuns/(totalInnings-totalNotOuts);
      bowlingAverage = runsConceded/wicketsTaken;
      highestScore= Math.max.apply(null, totalCenturies.map(function(index) {
          return index.runs;
      }));


      carrierData ={
         "matches" :{
           text:"Total Match Played",
           value:totalMatches
         },
         "innings" :{
           text:"Total Innings",
           value:totalInnings
         },
         "notOuts" :{
           text:"Not Outs",
           value:totalNotOuts
         },
         "runs":{
           text:"Runs Scored",
           value:totalRuns
         },
         "highestScore" : {
           text:"Highest Score",
           value:highestScore
         },
         "centuries":{
           text:"Centuries",
           value:totalCenturies.length,
         },
         "fifties":{
           text:"Half Century",
           value:totalHalfCenturies.length
         },
         "catches":{
           text:"Catch Taken",
           value:totalCatches
         },
         "battingAverage":{
           text:"Batting Average",
           value:Math.round(battingAverage * 100)/100
         },
         "bowlingAverage":{
           text:"Bowling Average",
           value:Math.round(bowlingAverage * 100)/100
         },
         "wickets" :{
           text:"Wickets Taken",
           value:wicketsTaken
         }
      };

      //centuries scored agains teams
      var matchesPlayedAgainst = _.values(_.groupBy(data,function(o){return o.opposition}));
      var playedOn = _.values(_.groupBy(data,function(o){return o.dates}));

      var oppositionTeamLabels=[];
      var oppositionTeamData = [];
      angular.forEach(matchesPlayedAgainst,function(c){
          oppositionTeamLabels.push(c[0].opposition);
          oppositionTeamData.push(c.length);
      });

      var years = [];
      angular.forEach(data,function(e){
        var Xmas = new Date(e.date);
        var year = Xmas.getFullYear();
        years.push(year);
      });

      years = _.uniqBy(years);

      var runsInyears = [];
      var halfCenturyInYear = [];
      var hundredsInYear = [];
      for(var i=0;i<years.length;i++){
        var sum=0;
        var half=0;
        var full=0;
        for(var j = 0; j<Innings.length;j++){
            //console.log(years[i]);
            //console.log(Innings[j].date);
            if(years[i]==Innings[j].date){
              sum +=Innings[j].runs;
              if(Innings[j].runs>=50 && Innings[j].runs<100){

                half++;
              }else if(Innings[j].runs>=100){
                full++;
              }
            }
        }
        runsInyears.push(sum);
        halfCenturyInYear.push(half);
        hundredsInYear.push(full);
      }

      var lineData = [];
      lineData.push(halfCenturyInYear);
      lineData.push(hundredsInYear);
      console.log("lineData",lineData);
      console.log(halfCenturyInYear);
      console.log(hundredsInYear);

      //pie chart data
       var pieLabels =[];
       pieLabels.push(totalCenturies.length);
       pieLabels.push(totalHalfCenturies.length);


      $scope.carrierData = carrierData;
      $scope.oppositionTeamLabels = oppositionTeamLabels;
      $scope.oppositionTeamData = oppositionTeamData;
      $scope.runsInyears = runsInyears;
      $scope.years = years;
      $scope.pielabels = pieLabels;
      $scope.lineData = lineData;
    }

    //sum value of particular column ...except batting_score
    function sumData(data,header){
      var sum = 0;
      var catchTaken=0;

      angular.forEach(data,function(value){
         if(header == 'catches' || 'runs_conceded' || 'wickets' || 'stumps'){
           console.log("catches");
            if(value[header]=='-'){
              value[header] = '0';
            }
            value[header] = parseInt(value[header]);
             sum += value[header];
          }
    });
    return sum;

    }
});
