(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientController', ClientController);

    ClientController.$inject = [
        '$rootScope', '$scope', 'server', '$state', '$interval',
        '$log', 'device', 'dataContext'
    ];

    function ClientController($rootScope, $scope, server, $state, $interval,
        $log, device, dataContext) {

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

        var clientId = dataContext.getClientId();
        if (clientId !== null) {
            client['id'] = clientId;
        }

        server.registerNewClient(client).then(function (result) {
            if (result.data !== undefined) {
                vm.client = result.data;
                dataContext.setClientId(vm.client.id);
            }
        }, function (error) {
            $log.error('Error while tying to register new client to the app: ', error);
        });

        $interval(function () {
            if (vm.client !== null && vm.client.id !== undefined) {
                 server.keepMeAlive(vm.client.id);           
            }
        }, 10000);


    }

})();