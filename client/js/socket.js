"use strict";

/*global io, $ */


const socket = io();

var locationArray = window.location.pathname.split("/");
var ExistingRoomID = locationArray [locationArray.length - 1];
if(ExistingRoomID == "Draw"){
  ExistingRoomID = "Draw"
}

var oldUsers = [];

$(document).ready(function() {
  socket.emit('adduser', '' , ExistingRoomID);
  socket.on('Myusername', function(username, Idnumber) {
    oldUsers.push(Idnumber);
    console.log('MyUsername : ' + username + " and ID :" + Idnumber);
  });
  socket.on('RoomId',(roomID)=>{
    console.log('roomId : '+roomID);
  });
  socket.on('getUsers', function(SocketsList) {
    for (var i in SocketsList) {
      if (oldUsers.indexOf(SocketsList[i].idNumber) == -1) {
        oldUsers.push(SocketsList[i].idNumber);
        console.log(oldUsers);
        $('body').append('<div id="' + SocketsList[i].idNumber + '" class="client-cursor" style="top:' + SocketsList[i].mouseX + 'px;left:' + SocketsList[i].mouseY + 'px;"><img src="public/img/Cursor.png" width="25px" height="23px"><span class="tooltiptext">' + SocketsList[i].username + '</span></div>');
      }
    }
  });


  $(document).mousemove(function(event) {
    socket.emit('mouseMove', event.pageX, event.pageY);
  });


  socket.on('mouseMove', function(idNumber,eventx,eventy) {

    $('#'+idNumber).animate({
      'left': eventx + 'px',
      'top': eventy + 'px'
    }, 0);

  });

  socket.on('drawing', function(idNumber,lastX ,lastY,eventx,eventy) {
    DrawLine (ctx ,lastX ,lastY , eventx,eventy );

  });

});
