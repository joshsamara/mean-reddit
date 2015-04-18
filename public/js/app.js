var app = angular.module("MainApp", ["ngRoute"]);

angular.module("MainApp").config(["$routeProvider",
    function ($routeProvider){
        $routeProvider.
            when('/home', {
                templateUrl: 'main.html',
                controller: 'MainController'
            }).
            when('/profile', {
                templateUrl: 'profile.html',
                controller: 'ProfileController'
            }).
            otherwise({
                redirectTo: '/home'
            });
}]);
