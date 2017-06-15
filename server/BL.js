/*jshint esversion: 6 */

(function (BL) {

    BL.registerNewClient = registerNewClient;
    BL.getClients = getClients;
    BL.addClientToAliveList = addClientToAliveList;
    BL.getUpdateAdminObject = getUpdateAdminObject;
    BL.registerExistsClient = registerExistsClient;

    var uuid = require('uuid');

    var clients = new Map();
    var aliveClients = new Map();
    var oldAliveClients = null;

    function registerNewClient(client) {
        
        // genrate new guid
        client["id"] = uuid.v4(); 

        // add the new client to the dictionery
        clients.set(client.id, client);

        addClientToAliveList(client.id);
    }

    function registerExistsClient(client){
        if (!clients.has(client.id)) {
            clients.set(client.id, client);
            addClientToAliveList(client.id);
        }
        addClientToAliveList(client.id);
    }

    function addClientToAliveList(clientId){
        aliveClients.set(clientId, clientId);
    }

    function getClients() {
        var connectedClients = [];

        clients.forEach(function(value, key) {
            connectedClients.push(value);
        }, this);

        return connectedClients;
    }

    function getUpdateAdminObject(){
        
        var disconnectedClients = [];
        var connectedClients = [];

        // check for disconnected clients
        if (oldAliveClients !== null) {                
            oldAliveClients.forEach(function(element) {
                if (!aliveClients.has(element)) {
                    disconnectedClients.push(element);
                }
            }, this);
        }
        else{
           oldAliveClients = new Map();         
        }
        
        // check for new connected clients
        aliveClients.forEach(function(element) {
            if (!oldAliveClients.has(element)) {
                connectedClients.push(element);
            }
        }, this);

        oldAliveClients = aliveClients;
        aliveClients = new Map();

        if (connectedClients.length > 0 || disconnectedClients.length > 0) {
            return {'disconnectedClients': disconnectedClients, 'connectedClients': connectedClients};
        }
        
        return null;        
    }



})(module.exports);