prestoApp.directive('affix', ['$window', '$document', '$parse', function ($window, $document, $parse) {
    return {
        scope: { affix: '&' },
        transclude: true,
        link: function (scope, element, attrs) {
            
            var win = angular.element($window),
                affixed;

            // Obviously, whenever a scroll occurs, we need to check and possibly 
            // adjust the position of the affixed element.
            win.bind('scroll', checkPosition);

            // Less obviously, when a link is clicked (in theory changing the current
            // scroll position), we need to check and possibly adjsut the position. We,
            // however, can't do this instantly as the page may not be in the right
            // position yet.
            win.bind('click', function () {
                setTimeout(checkPosition, 1);
            });

            function checkPosition() {
                var offset = scope.affix();
                var affix = win.prop('pageYOffset') <= offset ? 'affix-top' : 'affix';

                if (affixed === affix) { return; }

                affixed = affix;
                ;
                element.removeClass('affix affix-top').addClass(affix);
                
            }
        }
    };
}]);