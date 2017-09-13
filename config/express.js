var express = require('express');
var consign = require('consign');

module.exports = function(){
	var app = express();

consign({cwd: 'app'})
	.include('routes')
	.then('persistence')
	.into(app);

	return app;
}