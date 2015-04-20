var app = angular.module("MainApp", ["ngRoute"]);

app.config(["$routeProvider",
    function ($routeProvider){
        $routeProvider.
            when('/', {
                templateUrl: 'main.html',
                controller: 'MainController'
            }).
            when('/profile/:userName', {
                templateUrl: 'profile.html',
                controller: 'ProfileController'
            }).
            when('/group/new', {
                templateUrl: 'newGroup.html',
                controller: 'NewGroupController'
            }).
            when('/group/:groupName', {
                templateUrl: 'main.html',
                controller: 'GroupController'
            }).
            when('/group/:groupName/new', {
                templateUrl: 'newPost.html',
                controller: 'NewPostController'
            }).
            when('/post/:postId', {
                templateUrl: 'post.html',
                controller: 'PostController'
            }).
            when('/register', {
                templateUrl: 'register.html',
                controller: 'RegisterController'
            }).
            when('/search', {
                templateUrl: 'search.html',
                controller: 'SearchController'
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
    var user = null;
    var userService = {};

    userService.set = function(newUser) {
        user = newUser;
    };

    userService.get = function() {
        return user;
    };

    return userService;
});

// Directives to translate our foreign keys
app.directive("userName", ['$http', function($http) {
  return {
    template: "<a ng-href='#/profile/{{name}}'><span>{{name}}</span></a>",
    scope: {
      userId: "="
    },
    link: function(scope) {
      $http.get("/api/user/" + scope.userId).then(function(result) {
        scope.name = result.data.username;
      }, function(err) {
        scope.name = "unknown";
      });
    }
  };
}]);

app.directive("groupName", ['$http', function($http) {
  return {
    template: "<a ng-href='#/group/{{name}}'><span>{{name}}</span></a>",
    scope: {
      groupId: "="
    },
    link: function(scope) {
      $http.get("/api/group/" + scope.groupId).then(function(result) {
        scope.name = result.data.name;
      }, function(err) {
        scope.name = "unknown";
      });
    }
  };
}]);


app.directive("postTitle", ['$http', function($http) {
  return {
    template: "<a ng-href='#/post/{{postId}}'><span>{{title}}</span></a>",
    scope: {
      postId: "="
    },
    link: function(scope) {
      $http.get("/api/post/" + scope.postId).then(function(result) {
        scope.title = result.data.title;
      }, function(err) {
        scope.title = "unknown";
      });
    }
  };
}]);

app.run( function($rootScope, $location) {
   $rootScope.$watch(function() {
      return $location.path();
    },
    function(a){
      $rootScope.previousPage = $rootScope.currentPage;
      $rootScope.currentPage = a;
    });
});
