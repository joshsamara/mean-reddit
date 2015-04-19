// Controller for our main application
angular.module("MainApp").controller('ProfileController', ['$scope', '$http', '$routeParams', '$location', 'userFactory',
    function($scope, $http, $routeParams, $location, userFactory) {
        // Get the requested user and currently logged in user
        var userName = $routeParams.userName;
        var loggedUser = userFactory.get();

        // Go fetch things we want to display
        function getSubscribed(user){
            $http.post("/api/group/many", { ids: loggedUser.groups }).success(function(response){
                $scope.subscribed = response;
            });
        }

        function getFriends(user){
            $http.post("/api/user/many", { ids: loggedUser.friends }).success(function(response){
                $scope.friends = response;
            });
        }

        function getPosts(userId){
            $http.get("/api/user/" + userId + "/post").success(function(response){
                $scope.posts = response;
          });
        }

        function getComments(userId){
            $http.get("/api/user/" + userId + "/comment").success(function(response){
                $scope.comments = response;
          });
        }

        // Make sure this user exists
        $http.get("/api/user/name/" + userName).success(function(response){
            $scope.profileUser = response;
            var userId = response._id;

            // Now that we know this exists, get the resources to display
            getPosts(userId);
            getComments(userId);
            // Are we this user?
            $scope.profileOwner = loggedUser && (userId == loggedUser._id);
            if ($scope.profileOwner) {
                getSubscribed(loggedUser);
                getFriends(loggedUser);
            } else{
                $scope.friended = loggedUser && (loggedUser.friends.indexOf(userId) != -1);
            }
        }).error(function(response){
            $location.path('/404');
        });

        function editFriendship(suffix, friended){
            return function() {
                $http.get("/api/user/" + $scope.profileUser._id + "/" + suffix).success(function(response) {
                    loggedUser = response;
                    userFactory.set(loggedUser);
                    $scope.refreshUser();
                    getSubscribed(loggedUser);
                    getFriends(loggedUser);
                    $scope.friended = friended;
                });
            };
        }

        // We can friend this person
        $scope.friend =  editFriendship("friend", true);
        $scope.unfriend =  editFriendship("unfriend", false);
}]);
