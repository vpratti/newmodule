prestoApp
	.controller('ManageFrontsCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.frontsContentQueue = '';
        $scope.LM = '';
        $scope.LMC = '';

        $scope.draggable = { options: { effectAllowed: 'move', itemType: 'Text' } };
        $scope.droppable = { options: { typesAllowed: ['Text', 'text/plain'], effectAllowed: 'move' } };

		$scope.afterAssetDropped = function(data) {
        };

        $scope.onReorderDragEnd = function(dragkey, dropEffect) {
        };

        $scope.onDragEnded = function (dragkey, dropEffect) {
			if (dropEffect != 'none') {
				$scope.$apply(function() {
					$scope.frontsContentQueue.splice(dragkey, 1);
				});
			}
        };

        $scope.draggable = {
					options: {
						effectAllowed:'move',
						itemType: 'Text'
					}
		};


        $http({method: 'GET', url: '/Data/FrontsQueue.json'}).
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