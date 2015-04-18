// Controller for our main application
angular.module("MainApp").controller('ProfileController', ['$scope', '$http', '$routeParams', '$location', 'userFactory',
    function($scope, $http, $routeParams, $location, userFactory) {
        // Get the requested user and currently logged in user
        var userId = $routeParams.userId;
        var loggedUser = userFactory.get();

        // Go fetch things we want to display
        function setSubscribed(user){
            $http.post("/api/group/many", { ids: loggedUser.groups }).success(function(response){
                $scope.subscribed = response;
            });
        }

        function setFriends(user){
            $http.post("/api/user/many", { ids: loggedUser.friends }).success(function(response){
                $scope.friends = response;
            });
        }

        // Make sure this user exists
        $http.get("/api/user/" + userId).success(function(response){
            $scope.profileUser = response;

            // Are we this user?
            $scope.profileOwner = loggedUser && (userId == loggedUser._id);
            if ($scope.profileOwner) {
                setSubscribed(loggedUser);
                setFriends(loggedUser);
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
                    console.log(loggedUser.friends);
                    userFactory.set(loggedUser);
                    $scope.refreshUser();
                    setSubscribed(loggedUser);
                    setFriends(loggedUser);
                    $scope.friended = friended;
                });
            };
        }

        // Friend this person
        $scope.friend =  editFriendship("friend", true);
        $scope.unfriend =  editFriendship("unfriend", false);
}]);
