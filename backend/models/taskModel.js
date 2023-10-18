const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please add a title for your task'],
	},
	description: {
		type: String,
	},
	due_date: {
		type: Date,
	},
	priority: {
		type: Array,
	},
	status: {
		type: Boolean,
	},
});

module.exports = mongoose.model('Task', taskSchema);
