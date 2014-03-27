prestoApp.directive('assetPanel', function () {
    
    return {
        restrict: 'E',
        replace: false,
        scope: {
            options: '=',
        },
        templateUrl: '/desktopmodules/udmw/utilities/presto-ui/templates/AssetPanel.tpl.html',
        controller: function ($scope, $element, searchService) {
            $scope.name = "assetPanel.controller";
            $scope.searchResults = [];
            
            $scope.draggable = {
                options: {
                    effectAllowed:'move',
                    itemType: 'Text'
                }
            };

            $scope.addToClicked = function (index) {
                if ($scope.options.addToHandler) {
                    var clone = angular.copy($scope.searchResults[index]);
                    
                    $scope.options.addToHandler(clone);
                    
                    $scope.searchResults.splice(index, 1);
                }
            };

            $scope.search = function(searchTerm) {
                if (!angular.isDefined(searchTerm)) searchTerm = "";
                $scope.isSendRequest = true;
                $scope.searchResults = [];
                $scope.noSearchResults = false;
                $scope.noSearchTerm = '';

                searchService.query({ searchTerm: searchTerm, assetTypeFilter: $scope.options.searchAssetTypeFilter, onlyPublishedAssets: $scope.options.onlyPublishedAssets },
                    function onSuccess(response) {
                        if ($scope.options.excludeFromResults) {
                            angular.forEach(response, function(item) {
                                if ($scope.options.excludeFromResults(item.id) == false) {
                                    $scope.searchResults.push(item);
                                }
                            });
                            if ($scope.searchResults.length < 1) {
                                $scope.noSearchResults = true;
                                $scope.noSearchTerm = searchTerm;
                            } else {
                                $scope.noSearchResults = false;
                            }
                        } else {
                            $scope.searchResults = response;
                        }
                        $scope.isSendRequest = false;

                    }, function onError(response) {
                        console.log("error while searching " + $scope.searchTerm);
                        $scope.isSendRequest = false;
                    });
            };

            $scope.onDragEnded = function (dragkey, dropEffect) {

                if (dropEffect != 'none') {
                    $scope.$apply(function() {
                        $scope.searchResults.splice(dragkey, 1);
                    });
                }

            };
        }
    };
});
