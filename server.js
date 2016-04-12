var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});
app.get('/public/js/:filename', function(req, res) {
  res.sendFile(__dirname + '/client/js/'+req.params.filename);
  
});
app.get('/public/css/:filename', function(req, res) {
  res.sendFile(__dirname + '/client/css/'+req.params.filename);
  
});
app.get('/public/img/:filename', function(req, res) {
  res.sendFile(__dirname + '/client/img/'+req.params.filename);
  
});
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that! 404');
});

var fs = require('fs');
var SocketsList=JSON.parse(fs.readFileSync('db.txt', 'utf8'));;


console.log(SocketsList);
io.on('connection', function(socket){
  console.log('a user connected');
  
    socket.on('adduser', function(username) {
   // we store the username in the socket session for this client
   if (username === '' || username === null) {
    username = 'Guest' + Math.floor((Math.random() * 1000) + 1);

   }
   socket.username = username;
   
   //console.log(io.sockets.clients());
//   function logArrayElements(element, index, array) {
//   console.log('Socketslist[' + index + '] = ' + element.username);
// }
//   SocketsList.forEach(logArrayElements);
  
   console.log(SocketsList.length)
  var newPersonSoc= function(username,SockId,mouseX,mouseY){
      this.username=username;
      this.SockId=SockId;
      if (typeof mouseX === 'undefined') { mouseX = 0; }
      if (typeof mouseY === 'undefined') { mouseY = 0; }
      this.mouseX=mouseX;
      this.mouseY=mouseY;
      
  };
  var newPersonOb=new newPersonSoc(socket.username,socket.id);
  console.log(newPersonOb)
  updatedb(newPersonOb,"write");
  
  
  });
  
  
  
   socket.on('mouseMove', function(eventx,eventy){
    //console.log(eventx + " "+ eventy);
    socket.broadcast.emit('mouseMove', eventx,eventy);
     //io.emit('mouseMove');
  });
  
  
  socket.on('disconnect', function() {
      console.log('Got disconnect!');

      var i = SocketsList.indexOf(socket);
      updatedb(i,"del");
   });
  
  
  
  
});


http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});




function updatedb(Person,writeOrDel) {

    if(writeOrDel==="write"){
    SocketsList.push(Person);
    }
    else if(writeOrDel=="del"){
        SocketsList.splice(Person, 1);
    }
    var updateusers = JSON.stringify(SocketsList);


    fs.writeFile('db.txt', updateusers, function(err) {
        if (err) return console.log(err);

    });

}