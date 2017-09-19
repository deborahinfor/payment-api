# payment-api
This is a node.js Payment API, powered by Express that provides the main functions.

Setup
-Clone this repo to your desktop and run 'npm install' to install all the dependencies.
-To test payment by card you must have to clone the payment-card-api :
	https://github.com/deborahinfor/payment-card-api.git

-You might want to look into index.js to make change the port you want to use.

-Run the ./script.sql in your DB, you might want to make change into ./app/persistence/connectionFactory.js

Usage
After you clone this repo to your desktop, go to its root directory and run npm install to install its dependencies.

Its supose to run by comand line but you can also run by postman.

Once the dependencies are installed, you can run npm start or npm index.js or to use the nodemon to start the application.

how to use de application:

	-To find a payment:
	curl http://localhost:3000/payments/payment/1 -X GET -v -H "Content-type: application/json"


	-To register a payment: routes/payments.js :
		-information passing by file:
			curl http://localhost:3000/payments/payment -X POST -v -H "Content-type: application/json" -d @files/payment.json | json_pp
		
		-informations passing by comand line:
        curl -X POST -v -H "Content-type: application/json" http://localhost:3000/payments/payment -d '{
        "payment": {
          "payment_type": "payment_api",
          "amount": "30.87",
          "description": "Test payment by command line",
          "responsable_name":"Programmer"  
        }
        }'

	-To confirm a payment: routes/payments.js :
	curl http://localhost:3000/payments/payment/2 -X PUT -v -H "Content-type: application/json" | json_pp

	-To cancel a payment: routes/payments.js : 
	curl http://localhost:3000/payments/payment/2 -X DELETE -v -H "Content-type: application/json" | json_pp
