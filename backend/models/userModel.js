const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please input your name'],
		},
		email: {
			type: String,
			required: [true, 'Please input a valid email'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please input a valid password'],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);
