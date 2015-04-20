// Controller for the discover page
angular.module("MainApp").controller('DiscoverController', ['$scope', '$http',
    function($scope, $http){
        $scope.newest = {};
        $scope.random = {};
        $scope.randomEmpty = true;
        $scope.newestEmpty = true;

        // Get Posts
        $http.get('/api/post/discover/top').success(function(response){
            $scope.top_posts = response;
        });
        $http.get('/api/post/discover/new').success(function(response){
            $scope.newest.post = response;
            $scope.newestEmpty = false;
        });
        $http.get('/api/post/discover/random').success(function(response){
            $scope.random.post = response;
            $scope.randomEmpty = false;
        });

        // Get Users
        $http.get('/api/group/discover/new').success(function(response){
            $scope.newest.group = response;
            $scope.newestEmpty = false;
        });
        $http.get('/api/group/discover/random').success(function(response){
            $scope.random.group = response;
            $scope.randomEmpty = false;
        });
        // Get Groups
        $http.get('/api/user/discover/new').success(function(response){
            $scope.newest.user = response;
            $scope.newestEmpty = false;
        });
        $http.get('/api/user/discover/random').success(function(response){
            $scope.random.user = response;
            $scope.randomEmpty = false;
        });

    }
]);
