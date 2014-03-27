prestoApp.directive('mediaBullet', function () {

    return {
        restrict: 'E',
        replace: false,
        scope: {
            options: '=',
        },
        templateUrl: '/desktopmodules/udmw/utilities/presto-ui/templates/MediaBullet.tpl.html'
    };
});