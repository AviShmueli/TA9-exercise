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

        var service = {
            registerNewClient: registerNewClient
        };

        return service;
    }

})();