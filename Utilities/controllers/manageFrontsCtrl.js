prestoApp
	.controller('ManageFrontsCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.frontsContentQueue = '';
        $scope.LM = '';
        $scope.LMC = '';

        $http({method: 'GET', url: '/Data/ContentQueueData.json'}).
		    success(function(data) {
		      $scope.frontsContentQueue = data;
		    });

	    $http({method: 'GET', url: '/Data/LayoutModules.json'}).
   			success(function(data) {
     			$scope.LM = data;
   			});
		    
	    $http({method: 'GET', url: '/Data/LayoutModuleContent.json'}).
   			success(function(data) {
     			$scope.LMC = data;
   			});
    }]);