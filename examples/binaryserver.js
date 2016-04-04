"use strict";

// INCLUDES

if (typeof exports !== "undefined")
	{
	global.RpcCommunicator = require("./libs/webjsonrpc/binaryrpccommunicator");
	global.WebSocketServer = require("./libs/webjsonrpc/websocketserver");
	}


function BinaryServer()
{
var self = this;	

var LISTEN_ADDRESS = {host: "", port: "1979"};

var communicator = null; 
var websocketServer = null; 

self.onDisconnected = function(connectionId)	
	{
	console.log("BinaryServer::onDisconnected() "+connectionId);
   	};
	


self.sayBinaryHello = function(data, connectionId, callback)
	{
	console.log("BinaryServer::sayBinaryHello()");
	//console.log("Message: '" +message+ "' from connectionId: " + connectionId);
	//callback(null, "Greetings to you too!");
	};


self.run = function()
	{
	communicator = new BinaryRpcCommunicator();
	websocketServer = new WebSocketServer();
	
	communicator.exposeRpcMethod("sayBinaryHello", self, self.sayBinaryHello);
	
	
	communicator.setDisconnectionListener(self, self.onDisconnected);
	
	websocketServer.setConnectionListener(communicator);	
	
	
	websocketServer.listen(LISTEN_ADDRESS, function(err, data)
		{
		if (!err)	
			{
			console.log("WebsocketServer Started");
			}	
		else
			{
			console.log("Error: "+err);	
			}
		});	
	}
}


var server = new BinaryServer();
server.run();
