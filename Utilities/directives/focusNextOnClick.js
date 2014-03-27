prestoApp.directive('focusNextOnClick', function ($timeout) {
    return {
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                $timeout(function() {
                    element.next()[0].focus();
                });
            });
        }
    };
});
        