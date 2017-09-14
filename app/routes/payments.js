module.exports = function(app){

	app.get("/payments/payment/:id", function(req,res){
		console.log('Searching payment by ID');

		var id = req.params.id;

		var connection = app.persistence.connectionFactory();
		var paymentDao = new app.persistence.PaymentDao(connection);

		paymentDao.findByID(id, function(errors, result){
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

	app.post("/payments/payment", function(req,res){
		console.log('Processing the new payment requested.');

		req.assert("payment.payment_type", "Type of payment is required").notEmpty();
		req.assert("payment.amount", "Type of payment is required").notEmpty().isFloat();

		var error = req.validationErrors();
		if (error){
			console.log("Validation errors were found.");
			res.status(400).send(error);
			return;
		}

		var payment = req.body["payment"];

		payment.status = 'CREATED';
		payment.date = new Date;

		var connection = app.persistence.connectionFactory();
		var paymentDao = new app.persistence.PaymentDao(connection);

		paymentDao.create(payment, function(errors, result){
			if(errors){
				console.log('Error trying to insert into database: '+ errors);
				res.status(500).send(errors);
				return;
			}

		payment.id = result.insertId;
		console.log('Pagamento criado');

		res.status(201).json(result);
		});
	});
}
