var RedditCtrl = function ($scope) {
  reddit.hot('leagueoflegends').limit(4).fetch(function(res) {
    var posts = [];
    angular.forEach(res.data.children, function(post, index){
      if (post.data.thumbnail == 'self')
      {
        post.data.thumbnailAvail = false;
      }
      else if (post.data.thumbnail == 'default')
      {
        post.data.thumbnailAvail = false;
      }
      else
      {
        post.data.thumbnailAvail = true;
      }
      posts.push(post.data);
    });
    $scope.posts = posts;
  });
};