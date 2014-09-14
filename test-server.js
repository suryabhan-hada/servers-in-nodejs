var express=require('express'),
app=express(),
users={};

var server=require('http').createServer(app);
server.listen(process.env.PORT,process.env.IP);


var io=require('socket.io').listen(server);
console.log("Server Started");
app.get('/',function(req,res){
	res.sendfile(__dirname+'/index.html');
	//res.write("hello");
});

io.sockets.on('connection',function(socket){
	console.log("socket open");
	
	socket.on('user-name to server',function(data,callback) {
		if(data in users)
		{
			callback(false);
		}
		else
		{
			callback(true);
			socket.nickname=data;
			users[socket.nickname]=socket;
			updataeuserlist();
		}
	    
	});
	
	function updataeuserlist()
	{
			io.sockets.emit('usernames',Object.keys(users));
	}
	
	socket.on('message to server',function(data,callback){
		console.log(data);
		var msg=data.trim();
		
		if(msg.substr(0,4)=="bbt ")
		{
			console.log("pass 1");
			msg=msg.substr(4);
			var ind=msg.indexOf(" ");
			if(ind!=-1)
			{
				console.log("pass 2");
				name=msg.substring(0,ind);
				msg=msg.substring(ind+1);
				msg=msg.trim();
				if(name in users)
				{
					console.log("pass 3");
					console.log("wisper");
					
					users[name].emit('pvt message to client',{msg:msg ,nick: socket.nickname });
					
				}
				else
				{
					console.log('fail 3'+name);
					callback("chacha launda nahi h list mein ");
				}
				
			}
			else
			{
				callback("abe msg tho enter kar de bhai ");
			}
			
		}
		else
		{
			console.log(msg.substr(0,4));
			io.sockets.emit('message to client',{msg:data ,nick :socket.nickname });
		}
			
	});
	
	socket.on('disconnect',function(data){
		if(!socket.nickname)
			return;
		else
			delete users[socket.nickname];
			updataeuserlist();
	});
});