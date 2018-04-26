var method = OrdersAudits.prototype;

var id;
var sell_date;
var polpas_orders_id;
var created;
var modified;

function OrdersAudits() {
	
}

function OrdersAudits(model) {
	Object.assign(this, model);
}

module.exports = OrdersAudits;