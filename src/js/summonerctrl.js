var SummonerCtrl = function ($scope, $http) {
  $scope.name = summonername;
  
  var ucsummonername = summonername.toLowerCase();
  ucsummonername = ucsummonername.replace(/ /g,'');
  
  function getRatio() {
    if ($scope.summonerRanked.wins > 0 && $scope.summonerRanked.losses > 0)
    {
      return $scope.summonerRanked.wins / $scope.summonerRanked.losses;
    }
    else if ($scope.summonerRanked.wins <= 0)
    {
      return '-'+$scope.summonerRanked.losses;
    }
    else if ($scope.summonerRanked.losses <= 0)
    {
      return $scope.summonerRanked.wins;
    }
    else
    {
      return 'Error';
    }
  }
  
  $http({method: 'GET', url: 'https://prod.api.pvp.net/api/lol/static-data/euw/v1.2/realm?api_key='+apikey}).
    success(function(data, status, headers, config) {
      $scope.ddragonv = data.v;
    }).
    error(function(data, status, headers, config) {
      console.log('Error');
    });
      
  
  $http({method: 'GET', url: 'https://prod.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/'+summonername+'?api_key='+apikey}).
    success(function(data, status, headers, config) {
      $scope.summonerinfo = data[ucsummonername];
      var summonerid = $scope.summonerinfo.id; 
      
      $http({method: 'GET', url: 'https://prod.api.pvp.net/api/lol/euw/v1.3/stats/by-summoner/'+summonerid+'/summary?api_key='+apikey}).
        success(function(data, status, headers, config) {
          angular.forEach(data.playerStatSummaries, function(type){
            if (type.playerStatSummaryType === 'RankedSolo5x5')
            {
              $scope.summonerRanked = data.playerStatSummaries[5];
              $scope.summonerRanked.ratio = getRatio();
            }
            else if (type.playerStatSummaryType === 'AramUnranked5x5')
            {
              $scope.summonerAram = type;
            }
            else if (type.playerStatSummaryType === 'Unranked')
            {
              $scope.summonerUnranked = type;
            }
          });
        }).
        error(function(data, status, headers, config) {
          console.log('Error');
        });
      
      $http({method: 'GET', url: 'https://prod.api.pvp.net/api/lol/euw/v2.3/league/by-summoner/'+summonerid+'/entry?api_key='+apikey}).
        success(function(data, status, headers, config) {
          $scope.rankedInfo = data[0];
        }).
        error(function(data, status, headers, config) {
          console.log('Error');
        });
      
    }).
    error(function(data, status, headers, config) {
      console.log('Error');
    });
};