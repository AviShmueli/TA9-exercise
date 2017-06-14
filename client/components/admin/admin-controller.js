(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminController', AdminController);

    AdminController.$inject = [
        '$rootScope', '$scope', 'server', '$state',
        '$mdSidenav', '$mdComponentRegistry', '$log'
    ];

    function AdminController($rootScope, $scope, server, $state,
        $mdSidenav, $mdComponentRegistry, $log) {


        var vm = this;

        vm.toggle = angular.noop;

        vm.title = $state.current.title;
        //vm.allClients = [];

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

        server.getClients(0).then(function (result) {
            vm.allClients = result.data;
        }, function (error) {
            $log.error('Error while tying to get all clients :', error);
        });

        /*
        $scope.$watch(function () {
            return datacontext.getUserFromLocalStorage()
        }, function (oldVal, newVal) {
            vm.user = newVal;
            vm.imagesPath = device.getImagesPath();
        }, true);
        */


    }

})();