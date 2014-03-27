prestoApp.directive('fadeIn', function () {
    return {
        restrict: 'A',
        compile: function(elm) {
            $(elm).css('opacity', 0);
            return function(scope, elm, attrs) {
                var duration;
                duration = parseInt(attrs.dfFadeIn, 10);
                if (isNaN(duration)) {
                    duration = 500;
                }
                $(elm).animate({
                    opacity: 1.0
                }, duration);
            };
        }
    };
});
        