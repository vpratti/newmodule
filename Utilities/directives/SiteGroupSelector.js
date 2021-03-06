prestoApp.directive('siteGroupSelector', function ($compile) {

    return {

        restrict: 'E',
        transclude:true,
        replace: false,  
        templateUrl: '/desktopmodules/udmw/utilities/presto-ui/templates/siteGroupSelector.tpl.html',
        controller: function($scope, $attrs) {           
            $scope.hideRecentSiteGroups = false;
            $scope.showSiteGroups = true;
            
            $scope.recentSiteGroups = [
                {
                    id: '7890',
                    name: 'Daily Record'
                },
                {
                    id: '0123',
                    name: 'The Daily Journal'
                },
                {
                    id: '3456',
                    name: 'Asbury Park Press'
                }
            ];
            
            $scope.siteGroups = {
                    'recentSiteGroups': $scope.recentSiteGroups,
                    'allAvailableSiteGroups': [
                        {
                            id: '1234',
                            name: 'My Central Jersey'
                        },
                        {
                            id: '4567',
                            name: 'Courier Post'
                        },
                        {
                            id: '7890',
                            name: 'Daily Record'
                        },
                        {
                            id: '0123',
                            name: 'The Daily Journal'
                        },
                        {
                            id: '3456',
                            name: 'Asbury Park Press'
                        }
                    ],
            };
            $scope.selected = $scope.siteGroups.allAvailableSiteGroups[0];
            
            if ($scope.siteGroups.allAvailableSiteGroups.length <= 1 && $scope.recentSiteGroups.length <= 1) {
                $scope.showSiteGroups = false;
            }
            if ($scope.recentSiteGroups.length > 1)  {
                    $scope.hideRecentSiteGroups = true;
                };
                
            $scope.selectSite = function selectSite(group) {
                $scope.selected = group;
            };
        },
        link: function (scope, elem, attrs) {}
    };
});