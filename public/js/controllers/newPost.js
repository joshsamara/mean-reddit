// Controller for adding a new post
angular.module("MainApp").controller('NewPostController', ['$scope', '$http', '$location', 'userFactory', '$routeParams',
    function($scope, $http, $location, userFactory, $routeParams) {
        $scope.groupName = $routeParams.groupName;

        // Make sure we're actually logged in, otherwise redirect
        var user = userFactory.get();
        if (!user){
            $location.path('/group/' + $scope.groupName);
        }

        // Set this default to true
        $scope.postForm = $scope.postForm || {};
        $scope.postForm.link_post = 'true';

        // Allow us to make posts
        $scope.create = function(form) {
            form.user = user._id;
            $http.get("/api/group/name/" + $scope.groupName).success(function(response) {
                form.group = response._id;
                $http.post("/api/post", form).success(function(response) {
                    $scope.posterror = null;
                    $location.path('/post/' + response._id);
                }).error(function(response) {
                    $scope.posterror = "Invalid form.";
                });
            });
        };
}]);
