// Controller for our registration
angular.module("MainApp").controller('RegisterController', ['$scope', '$http', '$location', 'userFactory', '$rootScope',
    function($scope, $http, $location, userFactory, $rootScope) {
        // Allow logging in
        $scope.register = function(form) {
            $http.post("/register", form).success(function(response){
                $scope.regerror = null;
                userFactory.set(response);
                $scope.refreshUser();
                if ($rootScope.previousPage){
                    $location.path($rootScope.previousPage);
                } else{
                    $location.path('/');
                }
            }).error(function(response){
                $scope.regerror = "Invalid username or password.";
            });
        };
}]);
