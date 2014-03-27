prestoApp.directive('remainingCharacters', function () {
    return {
        template: '<strong  class="small">{{remaining}}</strong> / {{maxLen}}',
        scope: {
            maxLen:'=maxlength',
            model: '=ngModel'
        },
        link: function(scope, elem, attrs) {
            var checkLength = function(val) {
                var maxLen = parseInt(scope.maxLen, 10);

                if (!angular.isDefined(val) || !angular.isString(val)) {
                    scope.remaining = maxLen;
                    return;
                }
                var remaining = maxLen - val.length;
                if (remaining < 0)
                    scope.model = val.substr(0, maxLen);
                else
                    scope.remaining = remaining;
            };

            scope.$watch('model', function(val) {
                checkLength(val);
            });
        }
    };
});
        