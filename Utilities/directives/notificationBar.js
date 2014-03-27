prestoApp.directive('notificationBar', function() {
    return {
        restrict: 'E',
        controller: function($scope, $element, messageService) {
            messageService.subscribe('evt::user.notification', function(name, data) {
                $.bootstrapGrowl(data.message, {
                    ele: $element,
                    type: data.type,
                    offset: {
                        from: 'top',
                        amount: -11
                    },
                    align: 'center',
                    width: 'auto',
                    delay: data.autoDelete ? 3000 : 0,
                    allow_dismiss: true,
                    stackup_spacing: 10,
                });
            });
        }
    };
});
        