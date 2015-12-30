app.directive('status', function () {
    return {
        restrict: 'E',

        scope: {},

        template: '<span>{{vm.status}}</span>',

        controllerAs: 'vm',

        controller: function ($scope) {
            $scope.$watch('vm.status', function (value) {
                if (value !== undefined) {
                    console.log(value);
                }
            });
        },

        bindToController: {
            status: '@'
        }
    };
});