var method = User.prototype;

var id;
var username;
var password;
var role;
var name;
var active;
var created;
var modified;

function User() {
	
}

function User(model) {
	Object.assign(this, model);
}

module.exports = User;