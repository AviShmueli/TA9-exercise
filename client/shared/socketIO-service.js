(function () {
    'use strict';

    angular
        .module('app')
        .factory('socket', socket);

    socket.$inject = ['$rootScope', 'dataContext'];

    function socket($rootScope, dataContext) {
        var domain = window.location.origin;
        var socket = io.connect(domain); 

        function on(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        }

        function emit(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }

        socket.on('newClient', function(client) {
            // use the socket as usual
            console.log('new client have been register to the app', client);

            dataContext.addClients([client]);
        });

        socket.on('updateClientsStatus', function(updateObj) {
            // use the socket as usual
            console.log('clients join or disconnect from app', updateObj);
            if (updateObj.disconnectedClients.length > 0) {
                dataContext.updateClientsStatus(updateObj.disconnectedClients, false);
            }
            if (updateObj.connectedClients.length > 0) {
                dataContext.updateClientsStatus(updateObj.connectedClients, true);
            }
        });
        
        return {
            on: on,
            emit: emit
        };
    }

})();