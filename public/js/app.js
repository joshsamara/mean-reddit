var app = angular.module("MainApp", ["ngRoute"]);

app.config(["$routeProvider",
    function ($routeProvider){
        $routeProvider.
            when('/', {
                templateUrl: 'main.html'
            }).
            otherwise({
                redirectTo: '/'
            });
}]);
