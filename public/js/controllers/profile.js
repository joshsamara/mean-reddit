// Controller for our main application
angular.module("MainApp").controller('ProfileController', ['$scope', '$http', '$routeParams', '$location', 'userFactory',
    function($scope, $http, $routeParams, $location, userFactory) {
        var userId = $routeParams.userId;
        var loggedUser = userFactory.get()
        $http.get("/api/user/" + userId).success(function(response){
            $scope.profileUser = response;
            $scope.profileOwner = loggedUser && (userId == loggedUser._id)
            if ($scope.profileOwner) {
                $http.post("/api/group/many", { ids: loggedUser.groups }).success(function(response){
                    $scope.subscribed = response;
                });
            }
        }).error(function(response){
            $location.path('/404');
        });

}]);
