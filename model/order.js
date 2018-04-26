var method = Order.prototype;

var id;
var user_id;
var created;
var modified;
var polpasOrder;

function Order() {
	
}

function Order(model) {
	Object.assign(this, model);
}

module.exports = Order;