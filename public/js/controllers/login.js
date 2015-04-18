// Controller for our login application
// NOTE: Login is a parent to the other controllers.
// If any other controller changes the currently logged in uers, they must run:
// $scope.refreshUser()
angular.module("MainApp").controller('LoginController', ['$scope', '$http', 'userFactory', '$route',
    function($scope, $http, userFactory, $route) {

        // Immediately check if we're already logged in
        $scope.refreshUser = function(){
            $scope.user = userFactory.get();
            if (!$scope.user){
                $http.get("/loggedin").success(function(response){
                    $scope.user = response;
                    userFactory.set($scope.user);
                });
            }
        }

        $scope.refreshUser();
        // Allow logging in
        $scope.login = function(form) {
            $http.post("/login", form).success(function(response){
                $scope.error = null;
                $scope.user = response;
                userFactory.set($scope.user);
                $route.reload()
            }).error(function(response){
                $scope.error = "Invalid username or password.";
            });
        };

        // Allow logging out
        $scope.logout = function() {
            $http.get("/logout").success(function(response){
                $scope.user = null;
                userFactory.set($scope.user);
                $scope.refreshUser()
                $route.reload()
            }).error(function(response){
                $scope.user = null;
                userFactory.set($scope.user);
                $scope.refreshUser()
                $route.reload()
            });
        };
}]);
