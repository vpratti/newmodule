prestoApp.directive('assetBullet', function ($compile) {

    return {

        restrict: 'E',
        transclude:true,
        replace: false,
        scope: {
            asset: '='
        },
        link: function (scope, elem, attrs) {

            var mode = attrs.mode || 'standalone';
            
            var baseTemplate =
                '<span type="button" class="btn btn-mini asset-bullet">ID ' +
                    '<input type="text" value="{{asset.id}}" select-on-click />' +
                '</span>' +
                '<button type="button" class="btn btn-mini dropdown-toggle" data-toggle="dropdown">' +
                    '<span class="caret"></span>' +
                '</button>' +
                '<ul class="dropdown-menu asset-bullet-dropdown">' +
                    '<li ng-repeat="item in asset.actions">' +
                        '<a href="{{item.pathTemplate}}" target="_blank">{{item.caption}}</a>' +
                    '</li>' +
                '</ul>';

            var htmlTemplate = baseTemplate;

            if (mode == 'standalone') {
                htmlTemplate = '<div class="btn-group  metalinks" >' + baseTemplate + '</div>';
            }

            elem.replaceWith($compile(htmlTemplate)(scope));
        }
    };
});