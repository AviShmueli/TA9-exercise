/*jshint esversion: 6 */

(function (BL) {

    BL.registerNewClient = registerNewClient;
    BL.getClients = getClients;

    var deferred = require('deferred');

    var DAL = require('./DAL');

    function registerNewClient(client) {

        var d = deferred();

        DAL.registerNewClient(client).then(function () {
            d.resolve(client);
        }, function (error) {
            d.deferred(error);
        });

        return d.promise;
    }



    function getClients(page) {

        var d = deferred();

        DAL.getClients(page).then(function (result) {
            d.resolve(result);
        }, function (error) {
            d.deferred(error);
        });

        return d.promise;
    }



})(module.exports);

/*

function CCCC(DDD){
    
    var d = deferred();

    DAL.AAA().then(function(result) {
        d.resolve(result);
    }, function(error) {
        d.deferred(error);
    });

    return d.promise;
}

*/