(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminController', AdminController);

    AdminController.$inject = [
        '$rootScope', '$scope', 'server', '$state',
        '$mdSidenav', '$mdComponentRegistry', '$log',
        'dataContext', '$timeout', 'socket'
    ];

    function AdminController(
        $rootScope, $scope, server, $state,
        $mdSidenav, $mdComponentRegistry, $log,
        dataContext, $timeout, socket) {


        var vm = this;

        vm.toggle = angular.noop;

        vm.title = $state.current.title;
        //vm.allClients = [];
        vm.allClients = dataContext.getClients();
        vm.loading = false;

        if (vm.allClients.length === 0) {
            vm.loading = true;
            server.getClients().then(function (result) {
                dataContext.setClients(result.data);
                vm.loading = false;
            }, function (error) {
                $log.error('Error while tying to get all clients :', error);
            });
        }

        $scope.$watch(function () {
            return dataContext.getClients();
        }, function (newVal, oldVal) {
            vm.allClients = newVal;
        }, true);

        vm.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };

        /*$timeout(function(){
            server.getClients(0).then(function (result) {
                dataContext.addClients(result.data);
            }, function (error) {
                $log.error('Error while tying to get all clients :', error);
            });
        }, 10000);*/


    }

})();