prestoApp.directive('selectOnClick', function () {
    // Linker function
    return function (scope, elem, attrs) {
        elem.bind('click', function() {
            elem.select();
        });
    };
});