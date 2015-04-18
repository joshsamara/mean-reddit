var app = angular.module("MainApp", ["ngRoute"]);

app.config(["$routeProvider",
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
            when('/group/:groupName', {
                templateUrl: 'main.html',
                controller: 'GroupController'
            }).
            when('/register', {
                templateUrl: 'register.html',
                controller: 'RegisterController'
            }).
            when('/404', {
                templateUrl: '404.html',
            }).
            otherwise({
                templateUrl: '404.html',
            });
}]);


// Used to share the current user between controllers
app.factory('userFactory', function(){
    var user = null
    var userService = {};

    userService.set = function(newUser) {
        user = newUser;
    };

    userService.get = function() {
        return user;
    };

    return userService;
})
