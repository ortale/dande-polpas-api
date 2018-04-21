class FormHelper {
	static formatDate (date) {
		var date = new Date(date.split('/').reverse().join('/'));

		var monthValues = [
			"01", "02", "03", "04", "05", "06", 
			"07", "08", "09", "10", "11", "12"
		];

		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();

		day = day.toString().length == 1 ? '0' + day : day;

		return year  + '-' + monthValues[monthIndex] + '-' + day;
	}
}
module.exports = FormHelper;