// Controller for our main application
angular.module("MainApp").controller('LoginController', ['$scope', '$http',
    function($scope, $http) {

        // Immediately check if we're already logged in
        $http.get("/loggedin").success(function(response){
            $scope.user = response;
        });

        // Allow logging in
        $scope.login = function(form) {
            $http.post("/login", form).success(function(response){
                $scope.error = null;
                $scope.user = response;
            }).error(function(response){
                $scope.error = "Invalid username or password.";
            });
        };

        // Allow logging out
        $scope.logout = function(form) {
            $http.get("/logout", form).success(function(response){
                $scope.user = 0;
            });
        };
}]);
