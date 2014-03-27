prestoApp
	.controller('ManageFrontsCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.frontsContentQueue = '';

        $http({method: 'GET', url: '/Data/ContentQueueData.json'}).
		    success(function(data) {
		      $scope.frontsContentQueue = data;
		    });
		    
    }])

    .controller('LayoutModuleContentCtrl', function LayoutModuleContentCtrl($scope, $http) {
       $scope.name = 'LayoutModuleContentCtrl';
       $scope.LMC = ''
 
       $http({method: 'GET', url: '/Data/LayoutModuleContent.json'}).
   			success(function(data) {
     			$scope.LMC = data;
   			});
		});