app
.controller('CardController', function ($scope, GameEvents) {
    var self = this,

        init = function () {
            self.chooseProperty = function (propertyName) {
                $scope.$emit(GameEvents.PROPERTY_CHOSEN, propertyName);
            };
        };

    init();
})
.directive('card', function () {
    return {
        restrict: 'E',

        scope: {},

        // to have nested templates one needs to use the templateCache
        templateUrl: '../../card.html',

        controller: 'CardController',

        controllerAs: 'vm',

        bindToController: {
            data: '='
        }
    };
});