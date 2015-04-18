// Controller for adding a new post
angular.module("MainApp").controller('NewGroupController', ['$scope', '$http', '$location', 'userFactory',
    function($scope, $http, $location, userFactory) {
        // Make sure we're actually logged in, otherwise redirect
        var user = userFactory.get();
        if (!user){
            $location.path('/');
        }

        // Allow us to make groups
        $scope.create = function(form) {
            form.owner = user._id;
            $http.post("/api/group", form).success(function(response) {
                $scope.grouperror = null;
                $scope.refreshUser(true, function(){
                    $location.path('/group/' + response.name);
                });
            }).error(function(response){
                $scope.grouperror = "Invalid form.";
            });
        };
}]);
