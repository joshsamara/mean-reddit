// Controller for our main application
angular.module("MainApp").controller('ProfileController', ['$scope', '$http', '$routeParams', '$location',
    function($scope, $http, $routeParams, $location) {
        $scope.failed = false;
        userId = $routeParams.userId;
        $http.get("/api/user/" + userId).success(function(response){
            $scope.profileUser = response;
        }).error(function(response){
            $location.path('/404');
            $scope.failed = true;
        });
}]);
