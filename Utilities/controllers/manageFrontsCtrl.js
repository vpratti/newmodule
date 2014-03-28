prestoApp
	.controller('ManageFrontsCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.frontsContentQueue = '';

        $http({method: 'GET', url: '/Data/ContentQueueData.json'}).
		    success(function(data) {
		      $scope.frontsContentQueue = data;
		    });

		$scope.GetValueByKey = "http://icons.iconarchive.com/icons/wineass/ios7-redesign/128/Sample-icon.png";


    }]);