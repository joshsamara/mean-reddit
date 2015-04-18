var app = angular.module("MainApp", ["ngRoute"]);

angular.module("MainApp").config(["$routeProvider",
    function ($routeProvider){
        $routeProvider.
            when('/', {
                templateUrl: 'main.html',
                controller: 'MainController'
            }).
            when('/profile/:userId', {
                templateUrl: 'profile.html',
                controller: 'ProfileController'
            }).
            when('/404', {
                templateUrl: '404.html',
            }).
            otherwise({
                templateUrl: '404.html',
            });
}]);
