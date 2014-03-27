prestoApp
	.controller('ManageFrontsCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.frontsContentQueue = '';

        $http({method: 'GET', url: '/Data/ContentQueueData.json'}).
		    success(function(data) {
		    	alert(data);
		      $scope.frontsContentQueue = data;
		    });
		    
    }]);