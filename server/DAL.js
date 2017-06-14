/*jshint esversion: 6 */

(function (DAL) {

    DAL.registerNewClient = registerNewClient;
    DAL.getClients = getClients;

    var mongodb = require('mongodb').MongoClient;
    var ObjectID = require('mongodb').ObjectID;
    var deferred = require('deferred');

    var mongoUrl = 'mongodb://admin:1234@ds123312.mlab.com:23312/ta9-exercise';

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

    function registerNewClient(client) {
        var d = deferred();

        getCollection('clients').then(function (mongo) {

            mongo.collection.insert(client, function (err, results) {

                if (err) {
                    var errorObj = {
                        message: "error while trying to add new Client to DB",
                        error: err
                    };
                    mongo.db.close();
                    d.reject(errorObj);
                }

                mongo.db.close();
                d.resolve(results);

            });
        });

        return d.promise;
    }

    function getClients(page) {

        var d = deferred();

        page = parseInt(page)

        getCollection('clients').then(function (mongo) {

            mongo.collection.find({}, {
                skip: page,
                limit: 20
            }).toArray(function (err, result) {
                if (err) {
                    var errorObj = {
                        message: "error while trying to get Clients:",
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