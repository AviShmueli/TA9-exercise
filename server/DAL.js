/*jshint esversion: 6 */

(function (DAL) {

    DAL.deleteGroups = deleteGroups;
    DAL.getUsersInCliqa = getUsersInCliqa;


    var deferred = require('deferred');

    function getCollection(collectionName) {

        var d = deferred();

        try {
            mongodb.connect(mongoUrl, function (err, db) {

                if (err) {
                    var errorObj = {
                        message: "error while trying to connect MongoDB",
                        error: err
                    };
                    d.reject(errorObj);
                }
                if (db) {
                    d.resolve({
                        collection: db.collection(collectionName),
                        db: db
                    });
                }
            });
        } catch (error) {
            d.reject(error);
        }

        return d.promise;
    }



    function deleteGroups(groupIds) {
        var d = deferred();

        getCollection('users').then(function (mongo) {

            mongo.collection.remove({
                    '_id': {
                        $in: groupIds
                    }
                },
                function (err, result) {
                    if (err) {
                        var errorObj = {
                            message: "error while trying to remove Group ",
                            error: err
                        };
                        mongo.db.close();
                        d.reject(errorObj);
                    }

                    mongo.db.close();
                    d.resolve(result.ops);
                });
        });

        return d.promise;
    }

    function getUsersInCliqa(cliqaId) {

        var d = deferred();

        getCollection('users').then(function (mongo) {

            mongo.collection.find({
                'cliqot._id': new ObjectID(cliqaId),
                cliqot: {
                    $exists: true
                }
            }, {
                '_id': true,
                'name': true,
                'avatarUrl': true,
                'type': true,
                'usersInGroup': true,
                'phone': true,
                'creatorId': true
                //'cliqot': true
            }).toArray(function (err, result) {

                if (err) {
                    var errorObj = {
                        message: "error while trying search user: ",
                        error: err
                    };
                    mongo.db.close();
                    d.reject(errorObj);
                }

                mongo.db.close();
                d.resolve(result);
            });
        });

        return d.promise;
    }

})(module.exports);

/*

        var d = deferred();

        getCollection('users').then(function (mongo) {

            mongo.collection.findOne({},
            function (err, result) {
                    if (err) {
                        var errorObj = {
                            message: "error while trying to ... ",
                            error: err
                        };
                        mongo.db.close();
                        d.reject(errorObj);
                    }

                    mongo.db.close();
                    d.resolve(result);
                });
        });

        return d.promise;

 */