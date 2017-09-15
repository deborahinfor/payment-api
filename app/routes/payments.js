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
		});
	});

	app.post("/payments/payment", function(req,res){
		console.log('Processing the new payment requested.');

		req.assert("payment.payment_type", "Type of payment is required").notEmpty();
		req.assert("payment.amount", "Type of payment is required").notEmpty().isFloat();

		var error = req.validationErrors();
		if (error){
			console.log("Validation errors were found: "+ error);
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
			console.log('Payment created');

			res.location('/payments/payment/' + payment.id);

			var response = {
			payment_details: payment,
			links:[
				{
				href:"http://localhost:3000/payments/payment/" + payment.id,
				rel:"confirm",
				method:"PUT"
				},
				{
				href:"http://localhost:3000/payments/payment/" + payment.id,
				rel:"cancel",
				method:"DELETE"
				}
			]
			}

			res.status(201).json(response);
		});
	});

	app.put("/payments/payment/:id", function(req,res){
		console.log('Confirming a payment.');

		var payment = {};
		payment.id =  req.params.id;
		payment.status = 'CONFIRMED';

		var connection = app.persistence.connectionFactory();
		var paymentDao = new app.persistence.PaymentDao(connection);

		paymentDao.updateStatus(payment, function(errors, result){
			if(errors){
				console.log('Error while confirm payment into database:'+ errors);
				res.status(500).send(errors);
				return;
			}
			console.log('Payment confirmed');

			var response = {
			payment_details: payment,
			links:[
            	{
				href:"http://localhost:3000/payments/payment/" + payment.id,
				rel:"cancel",
				method:"DELETE"
				}
			]
		}
			res.status(201).json(response);
		});
	});

	app.delete("/payments/payment/:id", function(req,res){
	console.log('Canceling a payment.');

	var payment = {};
	payment.id =  req.params.id;
	payment.status = 'CANCELLED';

	var connection = app.persistence.connectionFactory();
	var paymentDao = new app.persistence.PaymentDao(connection);

		paymentDao.updateStatus(payment, function(errors, result){
			if(errors){
				console.log('Error while cancelling payment into database:'+ errors);
				res.status(500).send(errors);
				return;
			}
			console.log('Payment cancelled');
			res.status(204).json(result);//status 204 - No Content
		});
	});

}
