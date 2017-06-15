(function () {
    'use strict';

    angular
        .module('app')
        .service('server', server);

    server.$inject = ['$http', 'dataContext'];

    function server($http, dataContext) {


        var self = this;

        var registerNewClient = function (client) {
            var req = {
                method: 'POST',
                url: '/registerNewClient',
                data: {
                    client: client
                }
            };

            return $http(req);
        }

        var keepMeAlive = function (clientId) {
            var req = {
                method: 'POST',
                url: '/keepMeAlive',
                data: {
                    clientId: clientId
                }
            };

            return $http(req);
        }

        var getClients = function () {
            var req = {
                method: 'GET',
                url: '/getClients'
            };

            return $http(req);
        }

        //socket.emit('join', {});

        /*socket.on('newClient', function(client) {
            // use the socket as usual
            console.log('new client have been register to the app', client);

            dataContext.addClients([client]);
        });

        socket.on('updateClientsStatus', function(updateObj) {
            // use the socket as usual
            console.log('clients join or disconnect from app', updateObj);
        });*/

        var service = {
            registerNewClient: registerNewClient,
            keepMeAlive: keepMeAlive,
            getClients: getClients
        };

        return service;
    }

})();