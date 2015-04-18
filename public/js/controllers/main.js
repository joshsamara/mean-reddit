// Controller for our main page
angular.module("MainApp").controller('MainController', ['$scope', '$http',
    function($scope, $http) {
        // Get our posts
        $http.get("api/post/many/top/").success(function(response){
            $scope.posts = response;
        });
}]);
