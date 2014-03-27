prestoApp.directive('assetInUseSignalr', function () {

    return {
        restrict: 'E',
        replace: false,
        scope: {
            options: '=',
        },
        template:
            '<div id="signalRUsersContainer" class="alert" ng-show="showContainer"><small>' +
            '<span>In Use By:&nbsp;</span><span id="signalRUsers">{{users}}</span>' +
            '</small></span></div>',
        controller: function ($scope, $routeParams) {

            $scope.name = "assetInUseSignalr.controller";
            $scope.showContainer = false;
            $scope.users = "";

            if ($routeParams.id != null && $routeParams.id.length > 0) {
                InUse.signalR.groupId = "Asset" + $routeParams.id;
                InUse.signalR.displayName = $('a[id*="registerLink"]').html().trim();
                InUse.signalR.userIn($.connection);
            }

            $scope.showSignalRContainer = function(message) {
                $scope.$apply(function () {
                    $scope.users = message;
                    if (message.length > 0) {
                        $scope.showContainer = true;
                    }
                    else {
                        $scope.showContainer = false;
                    }
                });
            };

            $scope.updateUsers = function(message) {
                message = message.split(',');

                var uniqueMessage = InUse.signalR.getUniqueUsernames(message);

                $scope.showSignalRContainer(uniqueMessage);
            };

            $.connection.inUseHub.client.updateUsers = function (message) {
                $scope.updateUsers(message);
            };
        }
    };
});