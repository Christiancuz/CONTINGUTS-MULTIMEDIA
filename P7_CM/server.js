var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var marcador = {
	equipoA:0,
	equipoB:0	
};

app.use("/pub", express.static('public'));

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});


io.on('connection', function(socket){
    console.log('Conected');
    io.emit('redibujar-marcador', marcador);
    socket.on('disconnect', function(){
        console.log('Disconnected');
    });

    socket.on('puntoA', function(){
        marcador.equipoA+=1;
        io.emit('redibujar-marcador', marcador);
    });

    socket.on('puntoB', function(){
        marcador.equipoB+=1;
        io.emit('redibujar-marcador', marcador);
    });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});


