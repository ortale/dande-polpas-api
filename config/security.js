var hash_test = "768593096574543542496749683645";

exports.testPassword = function(string) {
	var Password = require("node-php-password");
	return Password.hash(string);
}

exports.hashPassword = function(string, type, salt) {
	type = 'blowfish';
	if (type === 'blowfish') {
		return _crypt(string, false);
	}
	if (salt) {
		string = salt + string;
	}

	if (!type || type === 'sha1') {
		if (function_exists('sha1')) {
			return sha1(string);
		}
		type = 'sha256';
	}

	if (type === 'sha256' && function_exists('mhash')) {
		return bin2hex(mhash(MHASH_SHA256, string));
	}

	if (function_exists('hash')) {
		return hash(type, string);
	}
	return md5(string);
}

function _salt(length) {
	length = 22;
	var actualSalt = "DYhG93b0qyJfIxfs2guyVoUubWwvniR2G0FgaC9mi"; 

	console.log(sha1(uniqid(actualSalt, true)));
	console.log(new Buffer(sha1(uniqid(actualSalt, true)), 'utf8'));

	//salt = btoa(sha1(uniqid(actualSalt, true))).replace(array('+', '='),'.');
	var getStringBuffer = new Buffer(sha1(uniqid(actualSalt, true)));
	var encondeToBase64 = getStringBuffer.toString('base64');

	salt = encondeToBase64.replace('+','.');
	salt = salt.replace('=','.');

	console.log(salt);

	/*
	salt = str_replace(
		array('+', '='),
		'.',
		btoa(sha1(uniqid(salt, true)))
	);
	*/

	return salt.substr(0, length);
}

function _crypt(password, salt) {
	salt = false;
	salt = _salt(22);
	//salt = vsprintf('$2a$%02d$%s', array(10, salt));
	salt = "$2a$10$" + salt;

	invalidCipher = (
		salt.indexOf('$2y$') !== 0 &&
		salt.indexOf('$2x$') !== 0 &&
		salt.indexOf('$2a$') !== 0
	);
	if (salt === true || invalidCipher || salt.length < 29) {
		return 'Invalid salt: %s for %s Please visit http://www.php.net/crypt and read the appropriate section for building %s salts.';
	}

	return crypt(password, salt);
}

function crypt(password, salt) {
	var Password = require("node-php-password");
	var options = {
	   salt: "qwertyuiopasdfghjklzxc"
	}
	// Valid algorithms are "PASSWORD_DEFAULT", and "PASSWORD_BCRYPT" 
	// "PASSWORD_DEFAULT" is just an alias to "PASSWORD_BCRYPT", to be more 
	// compatible with PHP 
	var hash = Password.hash("password123", "PASSWORD_DEFAULT", options);

	return hash;
}

function sha1(value) {
	var crypto = require('crypto');
	var shasum = crypto.createHash('sha1');
	shasum.update(value);
	return shasum.digest('hex');
}

function uniqid (prefix, more_entropy) {
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +    revised by: Kankrelune (http://www.webfaktory.info/)
	// %        note 1: Uses an internal counter (in php_js global) to avoid collision
	// *     example 1: uniqid();
	// *     returns 1: 'a30285b160c14'
	// *     example 2: uniqid('foo');
	// *     returns 2: 'fooa30285b1cd361'
	// *     example 3: uniqid('bar', true);
	// *     returns 3: 'bara20285b23dfd1.31879087'
	if (typeof prefix === 'undefined') {
		prefix = "";
	}

	var retId;
	var formatSeed = function (seed, reqWidth) {
		seed = parseInt(seed, 10).toString(16); // to hex str
		if (reqWidth < seed.length) { // so long we split
		return seed.slice(seed.length - reqWidth);
		}
		if (reqWidth > seed.length) { // so short we pad
		return Array(1 + (reqWidth - seed.length)).join('0') + seed;
		}
		return seed;
	};

	// BEGIN REDUNDANT
	if (!this.php_js) {
		this.php_js = {};
	}
	// END REDUNDANT
	if (!this.php_js.uniqidSeed) { // init seed with big random int
		this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
	}
	this.php_js.uniqidSeed++;

	retId = prefix; // start with prefix, add current milliseconds hex string
	retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
	retId += formatSeed(this.php_js.uniqidSeed, 5); // add seed hex string
	if (more_entropy) {
		// for more entropy we add a float lower to 10
		retId += (Math.random() * 10).toFixed(8).toString();
	}

	return retId;
}

