var method = PolpasOrder.prototype;

var id;
var quantity;
var polpa_id;
var order_id;
var created;
var modified;

function PolpasOrder() {
	
}

function PolpasOrder(model) {
	Object.assign(this, model);
}

module.exports = PolpasOrder;