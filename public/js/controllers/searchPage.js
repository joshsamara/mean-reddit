// Controller for the group page
angular.module("MainApp").controller('SearchController', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams){
        $scope.term = $routeParams.term || '';

        function search(suffix, field){
            return function(){$http.get('/api/search/' + suffix, { params: { 'term': $scope.term } }).success(function(response){
                $scope[field] = response;
            });
            };
        }

        var userSearch = search('user', 'users');
        var groupSearch = search('group', 'groups');
        var postSearch = search('post', 'posts');

        $scope.searchAll = function(){
            userSearch($scope.term);
            groupSearch($scope.term);
            postSearch($scope.term);
        };

        $scope.searchAll();
}]);
