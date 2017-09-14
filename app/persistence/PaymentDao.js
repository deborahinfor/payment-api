function PaymentDao(connection){
	this._connection = connection;
}

PaymentDao.prototype.findByID = function(id, callback){
	this._connection.query('select * from payments where id = ?',[id], callback);
}

PaymentDao.prototype.create = function(payment, callback){
	this._connection.query('INSERT INTO payments SET ?', payment, callback);
}

module.exports = function(){
	return PaymentDao;
}
