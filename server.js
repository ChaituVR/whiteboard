"use strict";
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


require('./app/routes')(app);

var SocketsList = [];

console.log(SocketsList);
io.on('connection', socket => {
  var socketEvents = require('./app/socket');
    socketEvents(socket,SocketsList,io);
});

var listener = http.listen(process.env.APP_PORT || 8080, (req, res) => {
    require('dns').lookup(require('os').hostname(), (err, address, fam) => {
        if (err) console.log(err);
        console.log('We are live on http://' + address + ':' + listener.address().port);
    });
});

process.on( 'SIGINT', () => {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
  process.exit(1);
});
