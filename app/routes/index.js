"use strict";
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const clientPath = '/../../client/';

module.exports = function(app) {

    app.use(helmet());
    app.use('*/public?', express.static('client'));
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + clientPath + 'index/index.html'));
    });
    app.get('/draw/:new?', function(req, res) {
        console.log(req.params.new);
        res.sendFile(path.join(__dirname + clientPath + 'draw/draw.html'));
    });
    app.use(function(req, res, next) {
        res.status(404).sendFile(path.join(__dirname + clientPath + '404/404.html'));
    });
};
