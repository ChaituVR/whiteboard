"use strict";

module.exports = function (socket,SocketsList,io){
  socket.on('adduser', function(username,room) {
      if (username === '' || username === null) {
          username = 'Guest' + Math.floor((Math.random() * 1000) + 1);
      }
      if (room === '' || room === null) {
          room = 'room' + Math.floor((Math.random() * 10000) + 1);
      }
      console.log('New user Joined - ' + username+ ' in RoomId - '+room );

      socket.username = username;
      socket.RoomId = room;
      socket.idNumber = "user" + makeid();

      socket.emit('Myusername', socket.username, socket.idNumber);
      socket.emit('RoomId',socket.RoomId);

      socket.join(socket.RoomId);
      io.in(socket.RoomId).emit('getUsers', SocketsList);
  });

  socket.on('mouseMove', function(eventx, eventy) {
      socket.broadcast.in(socket.RoomId).emit('mouseMove', socket.idNumber, eventx, eventy); //io.emit('mouseMove');
  });


  socket.on('drawing', function(lastX, lastY, eventx, eventy) {
      socket.broadcast.in(socket.RoomId).emit('drawing', socket.idNumber, lastX, lastY, eventx, eventy); //io.emit('mouseMove');
  });

  socket.on('disconnect', function() {
      console.log('Got disconnect!');
  });
  function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 8; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
  }
  
}
