// Controller for the group page
angular.module("MainApp").controller('GroupController', ['$scope', '$http', '$routeParams', '$location', 'userFactory',
    function($scope, $http, $routeParams, $location, userFactory) {
        var groupName = $routeParams.groupName;
        var user = userFactory.get();
        $scope.can_subscribe = false;


        // Run some checks based on the current user
        function userCheck(user){
            if (user){
                if (user.groups.indexOf($scope.group._id) === -1) {
                    $scope.can_subscribe = true;
                    $scope.can_unsubscribe = false;
                } else {
                    $scope.can_subscribe = false;
                    $scope.can_unsubscribe = true;
                }
            }
        }

        // Get our group
        $http.get("/api/group/name/" + groupName).success(function(response) {
            $scope.group = response;
            $scope.owner = user && (user._id === $scope.group.owner);
            userCheck(user);
        }).error(function(response){
            $location.path('/404');
        });

        // Get our posts
        $http.get("api/group/" + groupName + "/posts").success(function(response){
            $scope.posts = response;
        });

        $scope.deleteGroup = function(){
            if ($scope.owner){
                $http.delete("/api/group/" + $scope.group._id).success(function(response) {
                    $location.path('/');
                });
            }
        };

        function editSubscription(suffix){
            return function() {
                $http.get("/api/group/" + $scope.group._id + "/" + suffix).success(function(response) {
                    user = response;
                    userFactory.set(user);
                    $scope.refreshUser();
                    userCheck(user);
                });
            };
        }

        // Subscribe to this group
        $scope.subscribe = editSubscription("subscribe");
        $scope.unsubscribe = editSubscription("unsubscribe");
}]);
