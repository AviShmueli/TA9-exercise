(function () {
    'use strict';

    angular
        .module('app')
        .service('server', server);

    server.$inject = ['$http'];

    function server($http) {


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

        var getClients = function (page) {
            var req = {
                method: 'GET',
                url: '/getClients',
                params: {
                    page: page
                }
            };

            return $http(req);
        }

        var service = {
            registerNewClient: registerNewClient,
            keepMeAlive: keepMeAlive,
            getClients: getClients
        };

        return service;
    }

})();