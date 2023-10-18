const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please input your name'],
	},
	email: {
		type: String,
		required: [true, 'Please input a valid email'],
	},
	password: {
		type: String,
		required: [true, 'Please input a valid password'],
	},
});

module.exports = mongoose.model('User', userSchema);
