module.exports = function(app){

	app.get("/payments/payment/:id", function(req,res){
		console.log('Searching payment by ID');

		var id = req.params.id;

		var connection = app.persistence.connectionFactory();
		var pagamentoDao = new app.persistence.PaymentDao(connection);

		pagamentoDao.findByID(id, function(errors, result){
			if(errors){
				console.log('Error while searching a payment in database: '+ errors);
				res.status(500).send(errors);
				return;
			}else if(result == ''){
				console.log('No payment found for the informed payment ID.');
				res.status(204).send("OK");
				return;
			}

			console.log('Payment found : ' + JSON.stringify(result));
			res.status(200).json(result);
			return;
		});
	});
}
