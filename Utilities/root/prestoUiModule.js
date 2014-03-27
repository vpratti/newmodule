'use strict';

/* module def */
//var prestoUi = angular.module('presto.ui', ['ngResource', 'ui.bootstrap', 'ui.select2', 'ui.keypress']);

prestoApp.config(['$httpProvider', function($httpProvider) {
    var sfWrapper = {
        getModuleId: function() {
            if (angular.isDefined($.dnnSF)) {
                return sf.getModuleId();
            }
            return -1;
        },
        getTabId: function() {
            if (angular.isDefined($.dnnSF)) {
                return sf.getTabId();
            }
            return -1;
        },
        getTabModuleId: function () {
            var result = -1;
            try {
                if (angular.isDefined(tabModuleId)) {
                    result = tabModuleId;
                }
            } catch(err) {}
            return result;
            
        },
        getAntiForgeryValue: function() {
            if (angular.isDefined($.dnnSF)) {
                return sf.getAntiForgeryValue();
            }
            return -1;
        }
    };

    $httpProvider.defaults.headers.common.ModuleId = sfWrapper.getModuleId();
    $httpProvider.defaults.headers.common.TabId = sfWrapper.getTabId();
    $httpProvider.defaults.headers.common.tabModuleId = sfWrapper.getTabModuleId();
    $httpProvider.defaults.headers.common.__RequestVerificationToken = sfWrapper.getAntiForgeryValue();

    $httpProvider.responseInterceptors.push('globalHttpInterceptor');

}]);

prestoApp.factory('globalHttpInterceptor', ['$q', '$window', 'messageService', function ($q, $window, messageService) {
    return function(promise) {
        return promise.then(function(response) {
            return response;
        }, function(response) {

            var status = response.status;

            //check for status(s) that we care about and deal with it.
            if (status === 0) {
                messageService.publish('evt::user.notification', { type: 'error', autoDelete: false, message: 'Oops, a connectivity problem has occurred, try again later.' });
                //todo: redirect or set some properties to turn off ui until communication is reestablished.

            } else if (status === 401) {
                $window.location.href = "/";
            }
                // the following are listed here for example purposes, the implementation is the same for each status code.
            else if (status === 403) {
                messageService.publish('evt::user.notification', { type: 'error', autoDelete: false, message: response.data.error.userMessage });

            } else if (status === 404) { //not found
                messageService.publish('evt::user.notification', { type: 'error', autoDelete: false, message: "Sorry, that item could not be found." });

            } else if (status === 500) {
                messageService.publish('evt::user.notification', { type: 'error', autoDelete: false, message: response.data.error.userMessage });

            }            

            return $q.reject(response);
        });
    };
}]);