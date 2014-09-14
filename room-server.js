var express=require('express'),
app=express();

var server=require('http').createServer(app);
server.listen(process.env.PORT,process.env.IP);


var io=require('socket.io').listen(server);
console.log("Server Started");
app.get('/',function(req,res){
	res.sendfile(__dirname+'/room-clients.html');
	//res.write("hello");
});

io.sockets.on("connection",function(client){
	client.on('send-message to server',function(data){
		console.log("the id of client socket is "+client.room);
		io.sockets.emit('message to client',data);
	});
});


