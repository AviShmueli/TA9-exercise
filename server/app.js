/*jshint esversion: 6 */

var express = require('express');
var BL = require('./BL');


var app = express();

var http = require('http');

var server = http.createServer(app);

var bodyParser = require('body-parser');

var port = process.env.PORT || 5009;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.use(express.static('./client'));
app.use(express.static('./bower_components'));
app.use(express.static('./node_modules'));

/* ----- cron  ------
var jobs = require('./cron-jobs');
 */



/* ---- Start the server ------ */
server.listen(process.env.PORT || 5009, function (err) {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.post('/registerNewClient', function (req, res) {
    
    var client = req.body.client;
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    
    client['IP'] = ip;
    //BL.deleteGroups(req.body.groupIds).then(function(result) {
    res.send(client);
    //}, function(error) {
    //    logger.log('error', error.message , error.error);
    //    res.status(500).send(error); 
    //});

});

app.get('/TaskManeger/getUsersInCliqa', function (req, res) {

    BL.getUsersInCliqa(req.query.cliqaId).then(function (result) {
        res.send(result);
    }, function (error) {
        logger.log('error', error.message, error.error);
        res.status(500).send(error);
    });

});