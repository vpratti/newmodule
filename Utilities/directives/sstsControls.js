prestoApp.directive('sstsControls', ['sstsService', function (sstsService) {

    return {
        restrict: 'E',
        replace: false,
        transclude: true,
        scope: {
            sstsModel: '=',
            options: '='
        },
        templateUrl: '/desktopmodules/udmw/utilities/presto-ui/templates/SstsControls.tpl.html',
        link: function ($scope) {
            $scope.name = "sstsControls";
            $scope.clearWatch = false;
            $scope.data = {
                sections: [],
                subsections: [],
                topics: [],
                subtopics: []
            };

            var refreshData = function (ssts) {
                sstsService.getSubsections(ssts.section)
                    .then(function (subsections) {
                        $scope.data.subsections = subsections;

                        return sstsService.getTopics(ssts.section, ssts.subsection);
                    })
                    .then(function (topics) {
                        $scope.data.topics = topics;

                        return sstsService.getSubtopics(ssts.section, ssts.subsection, ssts.topic);
                    })
                    .then(function (subtopics) {
                        $scope.data.subtopics = subtopics;

                        $scope.validate();
                        $scope.clearWatch = false;
                    });
            };

            $scope.$watch('sstsModel', function (newSsts, oldSsts) {

                if ($scope.clearWatch == true || !angular.isDefined(newSsts) || (newSsts.section == '' && newSsts.subsection == '' && newSsts.topic == '' && newSsts.subtopic == '')) {
                    return;
                }

                $scope.clearWatch = true;

                if (newSsts.section != oldSsts.section && oldSsts.section != '') {
                    console.log('section changed');
                    $scope.sstsModel.subsection = '';
                    $scope.sstsModel.topic = '';
                    $scope.sstsModel.subtopic = '';
                }

                if (newSsts.subsection != oldSsts.subsection && oldSsts.subsection != '') {
                    console.log('subsection changed');
                    $scope.sstsModel.topic = '';
                    $scope.sstsModel.subtopic = '';
                }
                if (newSsts.topic != oldSsts.topic && oldSsts.topic != '') {
                    console.log('topic changed');
                    $scope.sstsModel.subtopic = '';
                }
                refreshData(newSsts);

            }, true);

            sstsService.getSections()
                .then(function (sections) {
                    $scope.data.sections = sections;
                });
            $scope.validate = function () {
                $scope.options.isValid = ($scope.sstsModel.section != '');
                return $scope.options.isValid;
            };
            $scope.options.canPublish = function () {
                return $scope.validate();
            };
            $scope.options.canSaveDraft = function () {
                $scope.options.isValid = true;
            };
        }
    };
}]);