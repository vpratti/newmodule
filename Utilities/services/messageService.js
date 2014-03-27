prestoApp.factory('messageService', ['$rootScope', function ($rootScope) {
    var rootScope = $rootScope;
    return {
        publish: function(name, parameters) {
            rootScope.$emit(name, parameters);
        },
        subscribe: function(name, listener) {
            rootScope.$on(name, listener);
        }
    };
}]);