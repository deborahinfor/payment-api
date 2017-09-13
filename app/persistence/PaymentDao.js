function PaymentDao(connection){
	this._connection = connection;
}

PaymentDao.prototype.findByID = function(id, callback){
	this._connection.query('select * from payments where id = ?',[id], callback);
}

module.exports = function(){
	return PaymentDao;
}
