/*jshint esversion: 6 */

var express = require('express');
var BL = require('./BL');

var app = express();

var http = require('http');

var server = http.createServer(app);

var socket = require('./socketIO')(server);

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
    
    client['IP'] = getClientIP(req);

    if (!client.hasOwnProperty('id')) {        
        BL.registerNewClient(client);
        res.send(client);
        console.log('info', 'New client just connected to the app: ' , client);
    }
    else{
        BL.registerExistsClient(client);
        res.send(client);
        console.log('info', 'Client reconnected to the app: ' , client);
    }

    socket.sendNewClientToAdmin(client);
});

app.post('/keepMeAlive', function (req, res) {       
    BL.addClientToAliveList(req.body.clientId);
    res.send('ok');
});

app.get('/getClients', function (req, res) {
    var clients = BL.getClients()
    res.send(clients);
});

var getClientIP = function(req){
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

var interval = setInterval(function() {
    var updateObj = BL.getUpdateAdminObject();
    if (updateObj !== null) {             
        socket.sendUpdateToAdmin(updateObj);
    }
}, 10000);

