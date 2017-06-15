(function () {
    'use strict';

    angular
        .module('app')
        .service('dataContext', dataContext);

    dataContext.$inject = ['$rootScope', '$localStorage'];

    function dataContext($rootScope, $localStorage) {

        var self = this;
        //self.$storage = $localStorage;

        var getClients = function () {
            return self.clientsList !== undefined ? self.clientsList : [];
            //return self.$storage.clientsList !== undefined ? self.$storage.clientsList : [];
        }

        var setClients = function (clients) {
            self.clientsList = clients;
            //self.$storage.clientsList = clients;
        }

        var updateClientsStatus = function (clients, status) {
            
            var matchs = getClients().filter(function (obj) {
                return clients.indexOf(obj.id) !== -1;
            });

            for (var index = 0; index < matchs.length; index++) {
                matchs[index].isConnected = status;
            }

            $rootScope.$apply()
        }

        var addClients = function (clients) {
            setClients(getClients().concat(clients));
            $rootScope.$apply();
        }

        var service = {
            getClients: getClients,
            setClients: setClients,
            updateClientsStatus: updateClientsStatus,
            addClients: addClients
        };

        return service;
    }

})();