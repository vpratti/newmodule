prestoApp
   .controller('ManageFrontsCtrl', function ManageFrontsCtrl($scope, $http) {
       $scope.name = 'ManageFrontsCtrl';
       $scope.frontsContentQueue = ''

       $http({method: 'GET', url: '/Data/ContentQueueData.json'}).
   success(function(data) {
     $scope.frontsContentQueue = data;
   });

});