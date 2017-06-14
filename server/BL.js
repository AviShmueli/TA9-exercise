/*jshint esversion: 6 */

(function (BL) {

    BL.deleteGroups = deleteGroups;
    BL.getUsersInCliqa = getUsersInCliqa;

    var deferred = require('deferred');

    var DAL = require('./DAL');

    function deleteGroups(groupIds) {

        var d = deferred();

        var newGroupIds = [];
        for (var i = 0; i < groupIds.length; i++) {
            var groupId = groupIds[i];
            newGroupIds.push(new ObjectID(groupId));
        }

        DAL.deleteGroups(newGroupIds).then(function (result) {
            d.resolve(result);
        }, function (error) {
            d.deferred(error);
        });

        return d.promise;
    }



    function getUsersInCliqa(cliqaId) {

        var d = deferred();

        DAL.getUsersInCliqa(cliqaId).then(function (result) {
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