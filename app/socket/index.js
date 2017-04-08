"use strict";
var fs = require('fs');

module.exports = function (socket,SocketsList,io){
  console.log('a user connected');

  socket.on('adduser', function(username,room) {
      // we store the username in the socket session for this client
      if (username === '' || username === null) {
          username = 'Guest' + Math.floor((Math.random() * 1000) + 1);
      }
      if (room === '' || room === null) {
          room = 'room' + Math.floor((Math.random() * 10000) + 1);
      }
      console.log(room);
      socket.username = username;
      socket.idNumber = "user" + makeid();
      socket.emit('Myusername', socket.username, socket.idNumber);
      socket.emit('RoomId',room);
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
      socket.join(room);
      console.log(room);
      io.in(room).emit('getUsers', SocketsList);


        // console.log(io.sockets.adapter.rooms);
        // console.log(socket.client)
  });

  socket.on('mouseMove', function(eventx, eventy) {
    // console.log();
      var room = Object.keys(socket.rooms)[1]
      socket.broadcast.in(room).emit('mouseMove', socket.idNumber, eventx, eventy); //io.emit('mouseMove');
  });


  socket.on('drawing', function(lastX, lastY, eventx, eventy) {
    var room = Object.keys(socket.rooms)[1]
      socket.broadcast.in(room).emit('drawing', socket.idNumber, lastX, lastY, eventx, eventy); //io.emit('mouseMove');
  });

  socket.on('disconnect', function() {
      console.log('Got disconnect!');

      var i = Socketsearch(socket.username, SocketsList);
      updatedb(i, "del");
  });
  function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 8; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
  }
  function updatedb(Person, writeUpDel) {

      if (writeUpDel === "write") {
          SocketsList.push(Person);
      }
      else if (writeUpDel == "del") {
          SocketsList.splice(Person, 1);
      }
      else if (writeUpDel == "up") {
          //
          //
      }
      var updateusers = JSON.stringify(SocketsList);

      fs.writeFile('db.txt', updateusers, function(err) {
          if (err)
              return console.log(err);

      });

  }

  function Socketsearch(socketID, SocketsList) {
      for (var i = 0; i < SocketsList.length; i++) {
          if (SocketsList[i].SockId === socketID) {
              return i;

          }

      }
  }
}
