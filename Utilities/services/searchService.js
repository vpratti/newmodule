prestoApp.factory('searchService', ['$resource', 'config', function ($resource, config) {
    return $resource(config.baseApiUrl + 'PrestoSearch');
}]);
