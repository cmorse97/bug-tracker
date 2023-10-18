const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a project name'],
		},
		description: {
			type: String,
		},
		due_date: {
			type: Date,
		},
		priority: {
			type: Array,
			required: [true, 'Please set a priority level for this project.'],
		},
		status: {
			type: Boolean,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Project', projectSchema);
