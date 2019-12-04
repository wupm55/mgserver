var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on("chat message",function (data) {
        console.log("message from client: "+data)
        socket.emit('mm',{"message":data})

    })

});

app.get('/hi', function(req, res){
    console.log("hi")
    res.send("hi lll")
    io.emit('ioe',{"message":"this is io en"} );
});

http.listen(3300,function(){
    console.log('listening on *:3000');
});