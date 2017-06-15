(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientController', ClientController);

    ClientController.$inject = [
        '$rootScope', '$scope', 'server', '$state', '$interval',
        '$log', 'device'
    ];

    function ClientController($rootScope, $scope, server, $state, $interval,
        $log, device) {

        var vm = this;

        vm.title = $state.current.title;
        vm.client = null;

        var currTime = new Date();
        var client = {
            timeZone: (currTime.getTimezoneOffset() / 60) + ' hours',
            OS: device.getOSName(),
            browser: device.getBrowserName(),
            isConnected: true
        };

        server.registerNewClient(client).then(function (result) {
            if (result.data !== undefined) {
                vm.client = result.data;
            }
        }, function (error) {
            $log.error('Error while tying to register new client to the app: ', error);
        });

        $interval(function () {
            server.keepMeAlive(vm.client.id);
        }, 10000);


    }

})();