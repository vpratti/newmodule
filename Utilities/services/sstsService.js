prestoApp.factory('sstsService', ['$http', '$q', 'config', function ($http, $q, config) {
    return {
        getSections: function () {
            var deferred = $q.defer();
            
            var url = config.baseApiUrl + 'sites/' + config.currentSiteId + '/ssts';
            $http.get(url)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        },
        getSubsections: function (section) {
            var deferred = $q.defer();

            if (section == '') {
                deferred.resolve([]);
            } else {
                var url = config.baseApiUrl + 'sites/' + config.currentSiteId + '/ssts/' + section;
                $http.get(url)
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        deferred.reject(data);
                    });
            }
            return deferred.promise;
        },
        getTopics: function(section, subsection) {
            var deferred = $q.defer();
            if (section == '' || subsection == '') {
                deferred.resolve([]);
            } else {
                var url = config.baseApiUrl + 'sites/' + config.currentSiteId + '/ssts/' + section + '/' + subsection;
                $http.get(url)
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        deferred.reject(data);
                    });
            }
            return deferred.promise;
        },
        getSubtopics: function (section, subsection, topic) {
            var deferred = $q.defer();
            if (section == '' || subsection == '' || topic == '') {
                deferred.resolve([]);
            } else {
                var url = config.baseApiUrl + 'sites/' + config.currentSiteId + '/ssts/' + section + '/' + subsection + '/' + topic;
                $http.get(url)
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        deferred.reject(data);
                    });
            }
            return deferred.promise;
        }
    };
}]);