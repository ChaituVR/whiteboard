var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var fs = require('fs');

require('./app/routes')(app)

var SocketsList = [];

console.log(SocketsList);
io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('adduser', function(username) {
        // we store the username in the socket session for this client
        if (username === '' || username === null) {
            username = 'Guest' + Math.floor((Math.random() * 1000) + 1);

        }
        socket.username = username;
        socket.idNumber = "user" + makeid();
        socket.emit('Myusername', socket.username, socket.idNumber);

        var newPersonSoc = function(username, idNumber, mouseX, mouseY) {
            this.username = username;
            this.idNumber = idNumber;
            if (typeof mouseX === 'undefined') {
                mouseX = Math.floor((Math.random() * 600) + 1);
            }
            if (typeof mouseY === 'undefined') {
                mouseY = Math.floor((Math.random() * 600) + 1);
            }
            this.mouseX = mouseX;
            this.mouseY = mouseY;

        };
        var newPersonOb = new newPersonSoc(socket.username, socket.idNumber);
        updatedb(newPersonOb, "write");
        io.emit('getUsers', SocketsList);

    });

    socket.on('mouseMove', function(eventx, eventy) {
        socket.broadcast.emit('mouseMove', socket.idNumber, eventx, eventy); //io.emit('mouseMove');
    });

    // function saveMousePostions(id) {}
    socket.on('disconnect', function() {
        console.log('Got disconnect!');

        var i = Socketsearch(socket.username, SocketsList);
        updatedb(i, "del");
    });

});

var listener = http.listen(process.env.APP_PORT || 3000, (req, res) => {
    require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        console.log('We are live on http://' + add + ':' + listener.address().port);
    })
});

function updatedb(Person, writeUpDel) {

    if (writeUpDel === "write") {
        SocketsList.push(Person);
    } else if (writeUpDel == "del") {
        SocketsList.splice(Person, 1);
    } else if (writeUpDel == "up") {
        //
        //
    }
    var updateusers = JSON.stringify(SocketsList);

    fs.writeFile('db.txt', updateusers, function(err) {
        if (err)
            return console.log(err);

        }
    );

}

function Socketsearch(socketID, SocketsList) {
    for (var i = 0; i < SocketsList.length; i++) {
        if (SocketsList[i].SockId === socketID) {
            return i;

        }

    }
}

function getDetails(SocketsList, key) {
    var ListOfUsers = [];
    for (var i = 0; i < SocketsList.length; ++i)

        ListOfUsers.push(SocketsList[i][key]);
    return ListOfUsers;
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
