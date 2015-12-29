app.directive('status', function () {
        return {
            restrict: 'E',
            template: '<span>{{status}}</span>',
            link: function (scope) {
                // Use ($)scope.status to print to console log and add a message to the screen.
                scope.$watch('status', function (value) {
                    if (value !== undefined) {
                        console.log(value);
                    }
                });
            }
        };
    })

    .directive('connection', function () {
        return {
            restrict: 'E',
            templateUrl: 'connection-interface.html'
        };
    });
