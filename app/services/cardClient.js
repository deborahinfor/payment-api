var restifyClients = require('restify-clients');

function CardClient(){
	this._client = restifyClients.createJsonClient({
		url:'http://localhost:3001',
		version: '~1.0'
	});
}

CardClient.prototype.authorize = function(card, callback){
	this._client.post('/cards/authorize', card , callback);
}

module.exports = function(){
  return CardClient;
}
