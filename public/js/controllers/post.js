// Controller for viewing a post
angular.module("MainApp").controller('PostController', ['$scope', '$http', 'userFactory', '$routeParams',
    function($scope, $http, userFactory, $routeParams) {
        var postId = $routeParams.postId;
        var user = userFactory.get();
        // Get our post
        $http.get("/api/post/" + postId).success(function(response) {
            $scope.post = response;
            $scope.owner = user && (user._id === $scope.post.user);
            $http.get("/api/group/" + $scope.post.group).success(function(response){
                $scope.group = response;
            });
            if (!$scope.owner){
                $http.get("/api/user/" + $scope.post.user).success(function(response){
                    $scope.poster = response;
                });
            }
        }).error(function(response){
            $location.path('/404');
        });

}]);
