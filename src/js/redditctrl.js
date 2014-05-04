var RedditCtrl = function ($scope) {
  reddit.hot('leagueoflegends').limit(5).fetch(function(res) {
    $scope.posts = res.data.children;
  });
};