prestoApp
	.controller('ManageFrontsCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.frontsContentQueue = '';

        $http({method: 'GET', url: '/Data/ContentQueueData.json'}).
		    success(function(data) {
		      $scope.frontsContentQueue = data;
		    });
		    
    }]);