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


