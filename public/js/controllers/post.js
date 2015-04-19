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
