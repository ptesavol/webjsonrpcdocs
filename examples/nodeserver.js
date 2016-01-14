"use strict";

// INCLUDES

if (typeof exports !== "undefined")
	{
	global.RpcCommunicator = require("./libs/webjsonrpc/rpccommunicator");
	global.WebSocketServer = require("./libs/webjsonrpc/websocketserver");
	}


function NodeServer()
{
var self = this;	

var LISTEN_ADDRESS = {host: "", port: "19753"};

var communicator = null; 
var websocketServer = null; 

self.onDisconnected = function(connectionId)	
	{
	console.log("NodeServer::onDisconnected() "+connectionId);
   	};
	


self.sayHello = function(message, connectionId, callback)
	{
	console.log("Message: '" +message+ "' from connectionId: " + connectionId);
	callback(null, "Greetings to you too!");
	};


self.run = function()
	{
	communicator = new RpcCommunicator();
	websocketServer = new WebSocketServer();
	
	communicator.exposeRpcMethod("sayHello", self, self.sayHello);
	
	
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


var server = new NodeServer();
server.run();
