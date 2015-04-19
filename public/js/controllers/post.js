// Controller for viewing a post
angular.module("MainApp").controller('PostController', ['$scope', '$http', 'userFactory', '$routeParams', '$location',
    function($scope, $http, userFactory, $routeParams, $location) {
        var postId = $routeParams.postId;
        var user = userFactory.get();
        // Get our post
        $http.get("/api/post/" + postId).success(function(response) {
            $scope.post = response;
            $scope.owner = user && (user._id === $scope.post.user);
            $http.get("/api/group/" + $scope.post.group).success(function(response) {
                $scope.group = response;
            });
            if (!$scope.owner){
                $http.get("/api/user/" + $scope.post.user).success(function(response) {
                    $scope.poster = response;
                });
            }
        }).error(function(response){
            $location.path('/404');
        });

        // make a function to refresh the comments we know of
        function refreshComments(){
          $http.get('/api/post/' + postId + '/comment').success(function(response) {
            $scope.comments = response;
          });
        }

        // Run it as soon as we get here
        refreshComments();


        // Get our current vote
        if (user){
            $http.get('/api/post/' + postId + '/vote').success(function(response) {
                $scope.vote = response;
            });
        }
        function postVote(val) {
            return function() {
                // Assume success and edit UI immediately
                if($scope.vote) {
                    diff = val - $scope.vote.value;
                    $scope.vote.value = val;
                } else {
                    diff = val;
                }
                $scope.post.score += diff;
                $http.post('/api/post/' + postId + '/vote', { val: val }).success(function(response) {
                    $scope.vote = response;
                });
            };
        }

        $scope.upvote = postVote(1);
        $scope.downvote = postVote(-1);
        $scope.nullvote = postVote(0);

        // Let the owner delete this post
        $scope.deletePost = function(){
            if ($scope.owner){
                $http.delete("/api/post/" + $scope.post._id).success(function(response) {
                    if ($scope.group) {
                        $location.path('/group/' + $scope.group.name);
                    } else {
                        $location.path('/');
                    }
                });
            }
        };

        // Add a comment to the post
        $scope.addComment = function(commentText){
            body = { text: commentText };
            $http.post('/api/post/' + postId + '/comment', body).success(function(response) {
              $scope.commentText = null;
              refreshComments();
            });
        };

}]);
