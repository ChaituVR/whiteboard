`use strict`;
var express = require('express');
var path = require("path");


module.exports = function(app) {
    app.use('/public', express.static('client'));
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/../../client/index.html'));
    });
    app.get('/draw', function(req, res) {
        res.sendFile(path.join(__dirname + '/../../client/draw.html'));
    });
    app.use(function(req, res, next) {
        res.status(404).sendFile(path.join(__dirname + '/../../client/404.html'));
    });
};
