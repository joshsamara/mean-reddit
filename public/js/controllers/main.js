// Controller for our main application
angular.module("MainApp").controller('MainController', ['$scope', '$http',
    function($scope, $http) {
        $scope.greeting = "Hello!";
}]);
