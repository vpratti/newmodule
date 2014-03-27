prestoApp.directive('timer', function ($timeout) {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            interval: '@',
            countdown: '@',
            hadExpiration: '@',
            statusCode: '@'
        },
        link: function (scope, elem, attr) {
            scope.$watch('countdown', function (_countdown) {
                if (_countdown.length) {
                   scope.start();
                }
            });
        },
        controller: function ($scope, $element) {

            $scope.startTime = null;
            $scope.timeoutId = null;
            $scope.countdown = $scope.countdown && parseInt($scope.countdown, 10) > 0 ? parseInt($scope.countdown, 10) : undefined;
            $scope.status = 'not-started';

            function resetTimeout() {
                if ($scope.timeoutId) {
                    $timeout.cancel($scope.timeoutId);
                }
            }

            $scope.canShowCountDownLabel = function () {
                if ($scope.statusCode != '200') {
                    return false;
                }
                if ($scope.status == 'running') {
                    return true;
                }
                return false;
            };
            $scope.canShowExpirationLabel = function () {
                if ($scope.statusCode != '200') {
                    return false;
                }
                if ($scope.status == 'ended' || ($scope.hadExpiration == 'true' && $scope.status == 'not-started')) {
                    return true;
                }
                return false;
            };

            $scope.start = $element[0].start = function () {
                $scope.startTime = new Date();
                resetTimeout();
                tick();
            };

            $scope.stop = $element[0].stop = function () {
                $scope.stoppedTime = new Date();
                $timeout.cancel($scope.timeoutId);
                $scope.timeoutId = null;
            };

            $element.bind('$destroy', function () {
                $timeout.cancel($scope.timeoutId);
            });

            var tick = function () {
                if ($scope.countdown > 0) {

                    $scope.countdown--;

                    $scope.millis = $scope.countdown * 1000;
                    $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
                    $scope.minutes = Math.floor((($scope.millis / (1000 * 60)) % 60));
                    $scope.hours = Math.floor((($scope.millis / (1000 * 60 * 60)) % 24));

                    var display = ($scope.hours > 0)
                        ? $scope.hours.toString()
                        : 0;
                    display += ($scope.minutes < 10)
                         ? ':0' + $scope.minutes.toString()
                         : ':' + $scope.minutes.toString();
                    display += ($scope.seconds < 10)
                        ? ':0' + $scope.seconds.toString()
                        : ':' + $scope.seconds.toString();

                    $scope.display = display;

                    $scope.timeoutId = $timeout(function () {
                        tick();
                    }, $scope.interval);

                    $scope.status = 'running';
                }
                else if ($scope.countdown <= 0) {
                    if ($scope.status == 'running') {
                        $scope.status = 'ended';
                    }

                    $scope.stop();
                }
            };

            $scope.start();
        }
    };
});
