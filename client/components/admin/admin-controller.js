(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminController', AdminController);

    AdminController.$inject = [
                        '$rootScope', '$scope', 'server', '$state',
                        '$mdSidenav', '$mdComponentRegistry'
    ];

    function AdminController($rootScope, $scope, shared, $state, 
                              $mdSidenav, $mdComponentRegistry) {


        var vm = this;

        vm.auth = shared.info.auth;

        vm.toggle = angular.noop;

        vm.title = $state.current.title;

        this.isOpen = function () {
            return false
        };
        $mdComponentRegistry
            .when("left")
            .then(function (sideNav) {
                vm.isOpen = angular.bind(sideNav, sideNav.isOpen);
                vm.toggle = angular.bind(sideNav, sideNav.toggle);
            });

        vm.toggleRight = function () {
            $mdSidenav("left").toggle()
                .then(function () {});
        };

        vm.close = function () {
            $mdSidenav("right").close()
                .then(function () {});
        };

    }

})();
